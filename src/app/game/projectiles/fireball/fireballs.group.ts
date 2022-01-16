import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import { Fireball } from './fireball.projectile';

export class Fireballs extends Phaser.Physics.Arcade.Group {

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 5,
      active: false,
      visible: false,
      key: Fireball.SPRITE_KEY,
      classType: Fireball
    });
  }

  fireProjectile(): void {
    const projectile = this.getFirstDead();

    if (!projectile) {
      return;
    }

    projectile.fire();
  }

}
