import * as Phaser from 'phaser';
import { SceneConfig } from '../interfaces/scene.config';

export class BaseScene extends Phaser.Scene {

  constructor(config: SceneConfig) {
    super(config);
  }

  preload(): void {
    console.log('enter preload');
  }

  create(): void {
    console.log('enter create');
  }

}
