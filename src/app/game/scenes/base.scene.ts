import * as Phaser from 'phaser';
import { BaseUnit } from '../enemies/base/base.unit';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { TilesetConfig } from '../interfaces/tileset-config.interface';

export abstract class BaseScene extends Phaser.Scene {
  tilesetConfig: TilesetConfig;
  map: Phaser.Tilemaps.Tilemap;
  layers: { [key: string]: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.ObjectLayer };

  spawnPoint: Phaser.Types.Tilemaps.TiledObject;
  endPoint: Phaser.Types.Tilemaps.TiledObject;
  waypoints: Phaser.Types.Tilemaps.TiledObject[];
  towerpoints: Phaser.Types.Tilemaps.TiledObject[];

  enemies: BaseUnit[] = [];

  constructor(config: SceneConfig) {
    super(config);
    this.tilesetConfig = config.tilesetConfig || this.tilesetConfig;
  }

  preload(): void {
  }

  create(): void {
  }
}
