import { tilesetsConfig } from 'src/config/tilesets.config';
import { BaseUnit } from '../enemies/base/base.unit';
import { AxolotlEnemy } from '../enemies/axolotl/axolotl.enemy';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { ArcanePortal } from '../portals/arcane/arcane.portal';
import { FirePortal } from '../portals/fire/fire.portal';
import { IcePortal } from '../portals/ice/ice.portal';
import { PortalElement } from '../portals/portal-element.enum';
import { BaseProjectile } from '../projectiles/base/base.projectile';
import { BaseScene } from './base.scene';
import { initExplosionAnim } from '../anims/explosion.anim';


export class GrasslandScene extends BaseScene {
  static KEY: string = 'grassland-scene';
  static MAP_KEY: string = 'grassland-map';

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: GrasslandScene.KEY,
      tilesetConfig: tilesetsConfig.nature
    });
  }

  preload(): void {
    const { key, url } = this.tilesetConfig;

    this.load.tilemapTiledJSON(GrasslandScene.MAP_KEY, 'assets/maps/grassland.json');
    this.load.image(key, url);
  }

  create(): void {
    this.createMap();
    this.createLayers();
    this.createPoints();
    this.createAnims();

    const arcanePortal = this.createPortal(2, PortalElement.ARCANE);
    const icePortal = this.createPortal(1, PortalElement.ICE);
    const firePortal: FirePortal = this.createPortal(0, PortalElement.FIRE) as FirePortal;

    // TODO: Make axolotl collide with fireball somehow

    setInterval(() => {
      const axol = this.createAxolotl();
      axol.addCollider(firePortal.fireballs, this.onUnitHit)
      axol.move();

      this.enemies.push(axol);
    }, 1500);
  }

  onUnitHit(unit: BaseUnit, projectile: BaseProjectile): void {
    unit.takeDamage(projectile.damage);
    projectile.onHitTarget(unit);
  }

  createMap(): void {
    this.map = this.make.tilemap({
      key: GrasslandScene.MAP_KEY
    });
  }

  createLayers(): void {
    const { id, key } = this.tilesetConfig;
    const natureTiles = this.map.addTilesetImage(id, key);

    const backgroundLayer = this.map.createLayer('background', natureTiles);
    const pathLayer = this.map.createLayer('path', natureTiles);
    const zoneLayer = this.map.getObjectLayer('zones');

    pathLayer.setCollisionByExclusion([58], true);

    this.layers = {
      background: backgroundLayer,
      path: pathLayer,
      zones: zoneLayer,
    };
  }

  createPoints(): void {
    const zoneLayer = this.map.getObjectLayer('zones').objects;
    const waypointsLayer = this.map.getObjectLayer('waypoints').objects;
    const towerpointsLayer = this.map.getObjectLayer('towers').objects;

    this.spawnPoint = zoneLayer.find(z => z.name === 'spawn-point');
    this.endPoint = zoneLayer.find(z => z.name === 'end-point');
    this.waypoints = waypointsLayer.sort(wp => wp.id);
    this.towerpoints = towerpointsLayer.sort(tp => tp.id);
  }

  createAnims(): void {
    initExplosionAnim(this.anims);
  }

  createAxolotl(): AxolotlEnemy {
    const axolotl = new AxolotlEnemy(this, this.spawnPoint.x, this.spawnPoint.y)
      .setScale(2)
      .setOrigin(0.5);

    return axolotl;
  }

  createPortal(position: number, element: PortalElement): BaseUnit {
    const towerPoint = this.towerpoints[position];
    let portal;

    switch (element) {
      case PortalElement.ARCANE:
        portal = new ArcanePortal(this, towerPoint.x, towerPoint.y);
        break;
      case PortalElement.FIRE:
        portal = new FirePortal(this, towerPoint.x, towerPoint.y);
        break;
      case PortalElement.ICE:
        portal = new IcePortal(this, towerPoint.x, towerPoint.y);
        break;
    }

    portal
      .setScale(2)
      .setOrigin(0.5);

    return portal;
  }
}
