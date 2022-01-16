import { tilesetsConfig } from 'src/config/tilesets.config';
import { BaseUnit } from '../base/base.unit';
import { AxolotlEnemy } from '../enemies/axolotl/axolotl.enemy';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { ArcanePortal } from '../portals/arcane/arcane.portal';
import { FirePortal } from '../portals/fire/fire.portal';
import { IcePortal } from '../portals/ice/ice.portal';
import { PortalElement } from '../portals/portal-element.enum';
import { Fireball } from '../projectiles/fireball/fireball.projectile';
import { BaseScene } from './base.scene';

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

    this.load.spritesheet(AxolotlEnemy.SPRITE_KEY, AxolotlEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(ArcanePortal.SPRITE_KEY, ArcanePortal.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(Fireball.SPRITE_KEY, Fireball.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create(): void {
    this.createMap();
    this.createLayers();
    this.createPoints();

    const arcanePortal = this.createPortal(2, PortalElement.ARCANE);
    const icePortal = this.createPortal(1, PortalElement.ICE);
    const firePortal = this.createPortal(0, PortalElement.FIRE);

    // TODO: Make axolotl collide with fireball somehow

    setInterval(() => {
      const axol = this.createAxolotl();
      axol.move();
      this.enemies.push(axol);
    }, 500);
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
