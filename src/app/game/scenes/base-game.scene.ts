import { BehaviorSubject, filter, Observable, retryWhen, Subject, Subscription, tap } from "rxjs";
import { BaseEnemy } from "../enemies/base/base.enemy";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { ArcanePortal } from "../portals/arcane/arcane.portal";
import { FirePortal } from "../portals/fire/fire.portal";
import { IcePortal } from "../portals/ice/ice.portal";
import { PortalPlaceholder } from "../portals/placeholder/placeholder.portal";
import { PortalElement } from "../portals/portal-element.enum";
import { BaseProjectile } from "../projectiles/base/base.projectile";
import { BaseScene } from "./base.scene";
import * as _ from 'lodash';
import { BasePortal } from "../portals/base/base.portal";
import { PoisonPortal } from "../portals/poison/poison.portal";
import { assetsConfig } from "src/config/assets.config";
import { HolyPortal } from "../portals/holy/holy.portal";
import { MindPortal } from "../portals/mind/mind.portal";

export abstract class BaseGameScene extends BaseScene {
  mapKey: string;
  activePortals: BasePortal[] = [];
  portalPlaceholder: PortalPlaceholder;

  portalElementSelectedSubject$: BehaviorSubject<PortalElement>;
  portalSelectedSubject$: BehaviorSubject<BasePortal>;
  gameOverSubject$: BehaviorSubject<boolean>;
  gamePausedSubject$: BehaviorSubject<boolean>;
  startGameSubject$: BehaviorSubject<number>;
  restartGameSubject$: BehaviorSubject<boolean>;

  activePortalElement$: Observable<PortalElement>;
  sub$ = new Subscription();

  waveTimer: Phaser.Time.TimerEvent;

  constructor(config: SceneConfig) {
    super(config);

    this.mapKey = config.key;
  }

  preload(): void {
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

    this.events.on('destroy', () => this.onDestroy());
  }

  createMap(): void {
    this.map = this.make.tilemap({
      key: this.tilesetConfig.mapKey
    });
  }

  createLayers(): void {
    const { id, key } = this.tilesetConfig;
    const natureTiles = this.map.addTilesetImage(id, key);

    const assetsTiles = assetsConfig.map(config => {
      return this.map.addTilesetImage(config.key, config.key, config.frameWidth, config.frameHeight);
    });

    const backgroundLayer = this.map.createLayer('background', natureTiles);
    const propsLayer = this.map.createLayer('props', natureTiles);
    const pathLayer = this.map.createLayer('path', natureTiles);

    const sceneryLayer = this.map.createLayer('scenery', assetsTiles);
    const zoneLayer = this.map.getObjectLayer('zones');

    this.layers = {
      background: backgroundLayer,
      zones: zoneLayer,
      scenery: sceneryLayer,
      props: propsLayer,
    };

    this.pathLayer = pathLayer;
  }

  createPoints(): void {
    const zoneLayer = this.map.getObjectLayer('zones').objects;
    const waypointsLayer = this.map.getObjectLayer('waypoints').objects;

    this.spawnPoint = zoneLayer.find(z => z.name === 'spawn-point');
    this.endPoint = zoneLayer.find(z => z.name === 'end-point');
    this.waypoints = _.orderBy(waypointsLayer, ['id'], ['asc']);
  }

  createPortal(x: number, y: number, element: PortalElement): void {
    x = Phaser.Math.Snap.To(x, 40);
    y = Phaser.Math.Snap.To(y, 40);

    let portal: any;

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
      case PortalElement.POISON:
        portal = new PoisonPortal(this, x, y);
        break;
      case PortalElement.HOLY:
        portal = new HolyPortal(this, x, y);
        break;
      case PortalElement.MIND:
        portal = new MindPortal(this, x, y);
        break;
    }

    portal
      .setScale(2)
      .setOrigin(0.5)
      .setInteractive()
      .addCollider(this.activePortals);

    const portalsAreOverlapping = this.activePortals.some(activePortal => {
      return this.physics.overlap(portal, activePortal);
    });

    const portalIsOnPath = this.physics.overlapTiles(portal, this.pathLayer.culledTiles);

    if (portalsAreOverlapping || portalIsOnPath) {
      portal.destroyEnemy();
    } else {
      this.addPortal(portal);
      portal.startShooting();
    }
  }

  showPortalPlaceholder(element: PortalElement): void {
    let parentClass;
    let parentRange: number;

    switch (element) {
      case PortalElement.ARCANE:
        parentClass = ArcanePortal;
        parentRange = ArcanePortal.PORTAL_RANGE;
        break;
      case PortalElement.FIRE:
        parentClass = FirePortal;
        parentRange = FirePortal.PORTAL_RANGE;
        break;
      case PortalElement.ICE:
        parentClass = IcePortal;
        parentRange = IcePortal.PORTAL_RANGE;
        break;
      case PortalElement.POISON:
        parentClass = PoisonPortal;
        parentRange = PoisonPortal.PORTAL_RANGE;
        break;
      case PortalElement.HOLY:
        parentClass = HolyPortal;
        parentRange = HolyPortal.PORTAL_RANGE;
        break;
      case PortalElement.MIND:
        parentClass = MindPortal;
        parentRange = MindPortal.PORTAL_RANGE;
        break;
    }

    this.portalPlaceholder = new PortalPlaceholder(this, -1000, -1000, parentClass, parentRange)
      .setScale(2);
  }

  hidePortalPlaceholder(): void {
    this.portalPlaceholder.destroyEnemy();
    this.portalPlaceholder = null;
    this.portalElementSelectedSubject$.next(null);
  }

  addPortal(portal: BasePortal): void {
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

      if (portal instanceof ArcanePortal) {
        projectiles.push((portal as ArcanePortal).arcaneMissiles);
      }

      if (portal instanceof HolyPortal) {
        projectiles.push((portal as HolyPortal).holyOrbs);
      }

      if (portal instanceof MindPortal) {
        const mindPortalOrbs = (portal as MindPortal).activeRemoteOrbs;
        projectiles.push(...mindPortalOrbs.map(orb => orb.mindOrbs));
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
    projectile.onHitTarget(enemy);
  }

  startWaveInterval(): void {
    this.waveTimer = this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => this.checkCurrentWave(),
      timeScale: this.physics.world.timeScale
    });
  }

  checkCurrentWave(): void {
    if (this.enemies?.length > 0) {
      return;
    }

    const remainingHealth = this.levelHealthSubject$.value;

    // No more health, game over (loss)
    if (remainingHealth <= 0) {
      this.scene.pause();
      this.gameOverSubject$.next(false);
      return;
    }

    // Final round finished, game over (win)
    if (this.wavesManager.currentWave === this.wavesManager.maxWaves) {
      this.scene.pause();
      this.gameOverSubject$.next(true);
      return;
    }

    // Continue to the next wave
    this.earnGold(this.wavesManager.goldReward);
    this.wavesManager.startNextWave();
    this.setupEnemySpawners();
  }

  startNextWave(requestedWave?: number): void {
    this.wavesManager.startNextWave(requestedWave);
    this.setupEnemySpawners();
  }

  setupEnemySpawners(): void {
    const enemyClasses = this.wavesManager.getEnemies();
    const enemyClassKey = Object.keys(enemyClasses);

    enemyClassKey.forEach(key => {
      try {
        const enemiesToSpawn = enemyClasses[key];
        const enemySiblingDistance = enemiesToSpawn[0].DISTANCE_TO_SIBLING;

        setTimeout(() => {
          this.spawnEnemies(enemiesToSpawn, enemySiblingDistance);
        }, 1);
      } catch (e) {
        debugger;
      }
    });
  }

  spawnEnemies(enemiesToSpawn: (typeof BaseEnemy)[], enemySiblingDistance: number): void {
    const spawnEvent = this.time.addEvent({
      delay: enemySiblingDistance,
      repeat: enemiesToSpawn.length - 1,
      callback: () => {
        this.spawnEnemy(enemiesToSpawn[spawnEvent.repeatCount]);
      },
    });
  }

  spawnEnemy(EnemyClass, spawnX?: number, spawnY?: number, scale?: number, nextDestinationIndex?: number, initialTravelDistance?: any): void {
    const x = spawnX || this.spawnPoint.x;
    const y = spawnY || this.spawnPoint.y;

    const enemy = new EnemyClass(this, x, y) as BaseEnemy;
    enemy.traveledDistanceX = initialTravelDistance ? initialTravelDistance.x : enemy.traveledDistanceX;
    enemy.traveledDistanceY = initialTravelDistance ? initialTravelDistance.y : enemy.traveledDistanceY;

    enemy
      .setScale(scale || EnemyClass.SCALE)
      .setOrigin(0.5);

    enemy.addCollider(this.getCollidingProjectiles(), this.onUnitHit);
    enemy.startMoving(nextDestinationIndex);
    this.enemies.push(enemy);
  }

  createUIObservables(): void {
    this.portalElementSelectedSubject$ = (window as any).portalsTD.portalElementSelectedSubject$;
    this.portalSelectedSubject$ = (window as any).portalsTD.portalSelectedSubject$;
    this.gameOverSubject$ = (window as any).portalsTD.gameOverSubject$;
    this.gamePausedSubject$ = (window as any).portalsTD.gamePausedSubject$;
    this.startGameSubject$ = (window as any).portalsTD.startGameSubject$;
    this.restartGameSubject$ = (window as any).portalsTD.restartGameSubject$;

    this.activePortalElement$ = this.portalElementSelectedSubject$.asObservable().pipe(
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

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      if (gameObject instanceof BasePortal) {
        this.hideAllRadiusCircles();
        gameObject.toggleRadiusVisible(true);
        this.portalSelectedSubject$.next(gameObject);
      }
    });

    this.input.on('pointerdown', (pointer, objectsUnderMouse) => {
      if (this.portalPlaceholder) {
        this.createPortal(pointer.x, pointer.y, this.portalPlaceholder.PORTAL_ELEMENT);
        this.hidePortalPlaceholder();
      }

      if (objectsUnderMouse.length === 0) {
        this.hideAllRadiusCircles();
        this.portalSelectedSubject$.next(null);
      }
    }, this);

    this.input.on('gameout', () => {
      if (this.portalPlaceholder) {
        this.hidePortalPlaceholder();
      }
    }, this);

    const fastForward$ = this.levelFastForwardSubject$.pipe(
      tap(value => {
        if (value) {
          this.setTimeScale(0.5);
          return;
        }

        this.setTimeScale(1);
      })
    );

    const startGame$ = this.startGameSubject$.pipe(
      filter(value => value !== null),
      tap(value => {
        if (value) {
          if (value > 100) {
            this.wavesManager.setMaxWaves(1000);
          }

          this.startNextWave(value);
          this.startWaveInterval();
          this.scene.resume();
        }
      })
    );

    const gamePaused$ = this.gamePausedSubject$.pipe(
      filter(value => value !== null),
      tap(value => {
        // Continue the game
        if (value) {
          this.scene.pause();
          return;
        }

        // Pause the game
        this.scene.resume();
      })
    );

    const restartGame$ = this.restartGameSubject$.pipe(
      filter(value => value !== null),
      tap(value => {
        if (!value) {
          return;
        }

        this.enemies.forEach(enemy => {
          enemy.destroyEnemy();
        });

        this.activePortals.forEach(portal => {
          portal.destroyEnemy();
        });

        this.enemies = [];
        this.activePortals = [];
        this.wavesManager.resetWaves();
        this.restartGame();
      })
    );

    this.sub$.add(this.activePortalElement$.subscribe());
    this.sub$.add(fastForward$.subscribe());
    this.sub$.add(gamePaused$.subscribe());
    this.sub$.add(startGame$.subscribe());
    this.sub$.add(restartGame$.subscribe());
  }

  setTimeScale(scale: number): void {
    let timeScale: number = scale;

    if (scale === 0.5) {
      timeScale = 2;
    }

    this.tweens.timeScale = timeScale; // tweens
    this.physics.world.timeScale = scale; // physics
    this.time.timeScale = timeScale; // time events
    this.anims.globalTimeScale = timeScale;

    this.children.list.forEach((child) => {
      if (child.type === "ParticleEmitterManager") {
        (child as any).timeScale = 0.5;
      }
    });
  }

  hideAllRadiusCircles(): void {
    this.activePortals?.forEach(portal => portal.toggleRadiusVisible(false));
  }

  onDestroy(): void {
    this.waveTimer?.remove(false);
    this.sub$.unsubscribe();
  }
}

