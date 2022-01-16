import { tilesetsConfig } from 'src/config/tilesets.config';
import { AxolotlEnemy } from '../enemies/axolotl/axolotl.enemy';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { BaseScene } from './base.scene';
import Phaser from 'phaser';

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
  }

  create(): void {
    this.map = this.createMap();
    this.layers = this.createLayers();
    
    const axolotl = this.createAxolotl();
    axolotl.addCollider(this.layers.path);
  }

  createMap(): Phaser.Tilemaps.Tilemap {
    const map = this.make.tilemap({
      key: GrasslandScene.MAP_KEY
    });

    return map;
  }

  createLayers(): any {
    const { id, key } = this.tilesetConfig;
    const natureTiles = this.map.addTilesetImage(id, key);

    const backgroundLayer = this.map.createLayer('background', natureTiles);
    const pathLayer = this.map.createLayer('path', natureTiles);
    pathLayer.setCollisionByExclusion([58], true);

    return {
      background: backgroundLayer,
      path: pathLayer,
    };
  }

  createAxolotl(): AxolotlEnemy {
    const axolotl = new AxolotlEnemy(this, 120, 50)
      .setScale(2)
      .setOrigin(0.5);

    return axolotl;
  }

}
