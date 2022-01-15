import * as Phaser from 'phaser';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { TilesetConfig } from '../interfaces/tileset-config.interface';

export class BaseScene extends Phaser.Scene {
  tilesetConfig: TilesetConfig;
  map: Phaser.Tilemaps.Tilemap;
  layers: { [key: string]: Phaser.Tilemaps.TilemapLayer };

  constructor(config: SceneConfig) {
    super(config);

    this.tilesetConfig = config.tilesetConfig || this.tilesetConfig;
  }

}
