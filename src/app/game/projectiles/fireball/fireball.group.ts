import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { FireballProjectile } from './fireball.projectile';

export class FireballGroup extends Phaser.Physics.Arcade.Group {

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 10,
      active: false,
      visible: false,
      key: FireballProjectile.SPRITE_KEY,
      classType: FireballProjectile
    });
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: FireballProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (projectile) {
      projectile.setScale(1);
      projectile.fire(target.body.x, target.body.y);
      projectile.trackTarget(target);
    }
  }
}
