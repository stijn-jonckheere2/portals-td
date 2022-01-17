import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { initAxolotlAnims } from './axolotl.anims';

export class AxolotlEnemy extends BaseEnemy {
  static SPRITE_KEY = 'axolotl';
  static SPRITE_URL = 'assets/sprites/axolotl.png';


  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, AxolotlEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initAxolotlAnims(this.scene.anims);
  }

  override init(): void {
    super.init();

    this.speed = 200;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
