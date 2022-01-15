import { tilesetsConfig } from 'src/config/tilesets.config';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { BaseScene } from './base.scene';

export class GrasslandScene extends BaseScene {
  static KEY: string = 'grassland-scene';
  static MAP_KEY: string = 'grassland-map';

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: GrasslandScene.KEY,
      tilesetConfig: tilesetsConfig['nature']
    });
  }

  preload(): void {
    const { key, url } = this.tilesetConfig;

    this.load.tilemapTiledJSON(GrasslandScene.MAP_KEY, 'assets/maps/grassland.json');
    this.load.image(key, url);
  }

  create(): void {
    this.map = this.createMap();
    this.layers = this.createLayers();

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

    return {
      background: backgroundLayer,
      path: pathLayer,
    };
  }
}
