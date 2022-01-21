import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { ArcaneMissileProjectile } from './arcane-missile.projectile';

export class ArcaneMissileGroup extends Phaser.Physics.Arcade.Group {

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 100,
      active: false,
      visible: false,
      key: ArcaneMissileProjectile.SPRITE_KEY,
      classType: ArcaneMissileProjectile
    });
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: ArcaneMissileProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return;
    }

    if (projectile) {
      projectile.setScale(0.5);
      projectile.fire(target.body.center.x, target.body.center.y);
      projectile.trackTarget(target);
    }
  }
}
