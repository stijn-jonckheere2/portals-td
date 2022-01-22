import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { FireballProjectile } from './fireball.projectile';

export class FireballGroup extends Phaser.Physics.Arcade.Group {

  upgradedDamage: number = null;
  explosive: boolean = false;

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 25,
      active: false,
      visible: false,
      key: FireballProjectile.SPRITE_KEY,
      classType: FireballProjectile
    });
  }

  enableExplosiveProjectiles(): void {
    this.explosive = true;
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: FireballProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return;
    }

    const upgraded: boolean = this.upgradedDamage !== null;
    projectile.damage = upgraded ? this.upgradedDamage : projectile.damage;
    projectile.explosive = this.explosive;

    if (projectile) {
      projectile.setScale(1);
      projectile.fire(target.body.center.x, target.body.center.y);
      projectile.trackTarget(target);
    }
  }
}
