import * as Phaser from 'phaser';

export interface SceneConfig extends Phaser.Types.Scenes.SettingsConfig {
  type: any;
  scene: any[];
  scale: any;
}

