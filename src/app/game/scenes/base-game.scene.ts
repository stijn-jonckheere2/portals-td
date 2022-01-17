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
    this.createMap();
    this.createLayers();
    this.createPoints();
    this.createPortalPlaceholders();
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

  createPortal(x: number, y: number, element: PortalElement): BaseUnit {
    let portal;

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
      .setOrigin(0.5);

    return portal;
  }

  createPortalPlaceholders(): void {
    const firePortalPlaceholder = new PortalPlaceholder(this, 1920 / 2, 50, FirePortal);

    firePortalPlaceholder
      .setScale(2)
      .setInteractive();

    this.input.setDraggable(firePortalPlaceholder);

    this.input.on('drag', (pointer, gameObject: PortalPlaceholder, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on('dragend', (pointer, gameObject: PortalPlaceholder, dragX, dragY) => {
      const firePortal = new FirePortal(this, gameObject.x, gameObject.y);
      firePortal.setScale(2);

      this.addPortal(firePortal);
      gameObject.resetPosition();
    });
  }

  addPortal(portal: GamePortal): void {
    this.activePortals.push(portal);
    this.updateEnemyColliders();
  }

  getCollidingProjectiles(): any[] {
    const projectiles: any[] = [];

    this.activePortals.forEach(portal => {
      if (portal instanceof FirePortal) {
        projectiles.push((portal as FirePortal).fireballs);
      }
    });

    return projectiles;
  }

  updateEnemyColliders(): void {
    this.enemies.forEach(enemy => {
      enemy.addCollider(this.getCollidingProjectiles(), this.onUnitHit)
    });
  }

  onUnitHit(unit: BaseUnit, projectile: BaseProjectile): void {
    unit.takeDamage(projectile.damage);
    projectile.onHitTarget(unit);
  }

}

