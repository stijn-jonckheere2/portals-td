import * as Phaser from 'phaser';
import { TilesetConfig } from './tileset-config.interface';

export interface SceneConfig extends Phaser.Types.Scenes.SettingsConfig {
  type: any;
  scene: any[];
  scale: any;
  tilesetConfig?: TilesetConfig;
  fps: any;
}

