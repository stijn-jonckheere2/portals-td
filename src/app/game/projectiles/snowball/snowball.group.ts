import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { SnowballProjectile } from './snowball.projectile';

export class SnowballGroup extends Phaser.Physics.Arcade.Group {

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 10,
      active: false,
      visible: false,
      key: SnowballProjectile.SPRITE_KEY,
      classType: SnowballProjectile
    });
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: SnowballProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (projectile) {
      projectile.setScale(1);
      projectile.fire(target.body.x, target.body.y);
      projectile.trackTarget(target);
    }
  }
}
