import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { initAxolotlAnims } from './axolotl.anims';

export class AxolotlEnemy extends BaseEnemy {
  static SPRITE_KEY = 'axolotl';
  static SPRITE_URL = 'assets/sprites/axolotl.png';

  get bodyDynamic(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, AxolotlEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvents();
    initAxolotlAnims(this.scene.anims);
  }

  init(): void {
    this.bodyDynamic.setGravityY(300);
    this.setCollideWorldBounds(true);
  }

  initEvents(): void {
    this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  override update() {
    super.update();

    if (this.body.velocity.y > 0) {
      this.play('walkDown', true);
    }

    if (this.body.velocity.y < 0) {
      this.play('walkUp', true);
    }

    if (this.body.velocity.x > 0) {
      this.play('walkRight', true);
    }

    if (this.body.velocity.x < 0) {
      this.play('walkLeft', true);
    }
  }
}
