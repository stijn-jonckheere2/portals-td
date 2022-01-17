import { Observable, Observer, Subject, Subscription, tap } from "rxjs";
import { BaseEnemy } from "../enemies/base/base.enemy";
import { BaseUnit } from "../enemies/base/base.unit";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { ArcanePortal } from "../portals/arcane/arcane.portal";
import { FirePortal } from "../portals/fire/fire.portal";
import { GamePortal } from "../portals/game-portal.type";
import { IcePortal } from "../portals/ice/ice.portal";
import { PortalPlaceholder } from "../portals/placeholder/placeholder.portal";
import { PortalElement } from "../portals/portal-element.enum";
import { BaseProjectile } from "../projectiles/base/base.projectile";
import { BaseScene } from "./base.scene";

export abstract class BaseGameScene extends BaseScene {
  mapKey: string;
  activePortals: GamePortal[] = [];
  portalPlaceholder: PortalPlaceholder;

  portalSelectedSubject$: Subject<PortalElement>;
  activePortalElement$: Observable<PortalElement>;
  sub$ = new Subscription();

  constructor(config: SceneConfig) {
    super(config);

    this.mapKey = config.key;
  }

  override preload(): void {
    super.preload();

    const { key, url } = this.tilesetConfig;

    this.load.tilemapTiledJSON(this.tilesetConfig.mapKey, this.tilesetConfig.mapUrl);
    this.load.image(key, url);
  }

  override create(): void {
    super.create();
    this.createUIObservables();

    this.createMap();
    this.createLayers();
    this.createPoints();
    this.spawnEnemies();

    setInterval(() => {
      if (this.enemies?.length === 0) {
        this.earnGold(this.wavesManager.getRoundWonReward());
        this.wavesManager.startNextWave();
        this.spawnEnemies();
      }
    }, 1500);
  }

  createMap(): void {
    this.map = this.make.tilemap({
      key: this.tilesetConfig.mapKey
    });
  }

  createLayers(): void {
    const { id, key } = this.tilesetConfig;
    const natureTiles = this.map.addTilesetImage(id, key);

    const backgroundLayer = this.map.createLayer('background', natureTiles);
    const pathLayer = this.map.createLayer('path', natureTiles);
    const zoneLayer = this.map.getObjectLayer('zones');

    this.layers = {
      background: backgroundLayer,
      path: pathLayer,
      zones: zoneLayer,
    };
  }

  createPoints(): void {
    const zoneLayer = this.map.getObjectLayer('zones').objects;
    const waypointsLayer = this.map.getObjectLayer('waypoints').objects;

    this.spawnPoint = zoneLayer.find(z => z.name === 'spawn-point');
    this.endPoint = zoneLayer.find(z => z.name === 'end-point');
    this.waypoints = waypointsLayer.sort(wp => wp.id);
  }

  createPortal(x: number, y: number, element: PortalElement): void {
    x = Phaser.Math.Snap.To(x, 40);
    y = Phaser.Math.Snap.To(y, 40);

    let portal: GamePortal;

    switch (element) {
      case PortalElement.ARCANE:
        portal = new ArcanePortal(this, x, y);
        break;
      case PortalElement.FIRE:
        portal = new FirePortal(this, x, y);
        break;
      case PortalElement.ICE:
        portal = new IcePortal(this, x, y);
        break;
    }

    portal
      .setScale(2)
      .setOrigin(0.5)
      .addCollider(this.activePortals);

    const portalIsOverlapping = this.activePortals.some(activePortal => {
      return this.physics.overlap(portal, activePortal);
    });

    if (portalIsOverlapping) {
      portal.destroyEnemy();
    } else {
      this.addPortal(portal);
    }
  }

  showPortalPlaceholder(element: PortalElement): void {
    let parentClass;

    switch (element) {
      case PortalElement.ARCANE:
        parentClass = ArcanePortal;
        break;
      case PortalElement.FIRE:
        parentClass = FirePortal;
        break;
      case PortalElement.ICE:
        parentClass = IcePortal;
        break;
    }

    this.portalPlaceholder = new PortalPlaceholder(this, -1000, -1000, parentClass)
      .setScale(2);
  }

  hidePortalPlaceholder(): void {
    this.portalPlaceholder.destroyEnemy();
    this.portalPlaceholder = null;
    this.portalSelectedSubject$.next(null);
  }

  addPortal(portal: GamePortal): void {
    this.activePortals.push(portal);
    this.spendGold(portal.price);
    this.updateEnemyColliders();
  }

  getCollidingProjectiles(): any[] {
    const projectiles: any[] = [];

    this.activePortals.forEach(portal => {
      if (portal instanceof FirePortal) {
        projectiles.push((portal as FirePortal).fireballs);
      }
      if (portal instanceof IcePortal) {
        projectiles.push((portal as IcePortal).snowballs);
      }
    });

    return projectiles;
  }

  updateEnemyColliders(): void {
    this.enemies.forEach(enemy => {
      enemy.addCollider(this.getCollidingProjectiles(), this.onUnitHit)
    });
  }

  onUnitHit(enemy: BaseEnemy, projectile: BaseProjectile): void {
    enemy.takeDamage(projectile.damage);
    projectile.onHitTarget(enemy);
  }

  startNextWave(): void {
    this.wavesManager.startNextWave();
    this.spawnEnemies();
  }

  spawnEnemies(): void {
    const enemyClasses = this.wavesManager.getEnemies();
    let index = 0;

    const interval = setInterval(() => {
      const enemyClass = enemyClasses[index];
      this.spawnEnemy(enemyClass);
      index++;

      if (index == enemyClasses.length) {
        clearInterval(interval);
      }
    }, 500)
  }

  spawnEnemy(EnemyClass): void {
    const enemy = new EnemyClass(this, this.spawnPoint.x, this.spawnPoint.y) as BaseEnemy;

    enemy
      .setScale(2)
      .setOrigin(0.5);

    enemy.addCollider(this.getCollidingProjectiles(), this.onUnitHit)
    enemy.startMoving();

    this.enemies.push(enemy);
  }

  createUIObservables(): void {
    this.portalSelectedSubject$ = (window as any).portalsTD.portalSelectedSubject$;

    this.activePortalElement$ = this.portalSelectedSubject$.asObservable().pipe(
      tap((element: PortalElement) => {
        if (element !== null) {
          this.showPortalPlaceholder(element);
          return;
        }

        if (this.portalPlaceholder) {
          this.hidePortalPlaceholder();
        }
      })
    );

    this.input.on('pointermove', pointer => {
      if (this.portalPlaceholder) {
        this.portalPlaceholder.setX(pointer.x);
        this.portalPlaceholder.setY(pointer.y);
      }
    }, this);

    this.input.on('pointerdown', pointer => {
      if (this.portalPlaceholder) {
        this.createPortal(pointer.x, pointer.y, this.portalPlaceholder.PORTAL_ELEMENT);
        this.hidePortalPlaceholder();
      }
    }, this);

    this.input.on('gameout', () => {
      if (this.portalPlaceholder) {
        this.hidePortalPlaceholder();
      }
    }, this);

    this.events.on('destroy', () => {
      this.clearUIObservables();
    }, this);

    this.sub$.add(this.activePortalElement$.subscribe());
  }

  clearUIObservables(): void {
    this.sub$.unsubscribe();
  }
}

