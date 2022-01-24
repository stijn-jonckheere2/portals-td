import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { HolyOrbProjectile } from './holy-orb.projectile';

export class HolyOrbGroup extends Phaser.Physics.Arcade.Group {

  upgradedDamage: number = 0;

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 6,
      active: false,
      visible: false,
      key: HolyOrbProjectile.SPRITE_KEY,
      classType: HolyOrbProjectile,
    });

  }

  fireProjectile(spawnX: number, spawnY: number): HolyOrbProjectile {
    const projectile: HolyOrbProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return null;
    }

    projectile.damage = this.upgradedDamage > 0 ? this.upgradedDamage : projectile.damage;
    projectile.fire(null, null);
    projectile.setPushable(false);
    projectile.setImmovable(true);

    return projectile;
  }

  resetProjectiles(): void {
    const projectiles = this.getChildren();

    projectiles.forEach((projectile: BaseProjectile) => {
      projectile.destroyEnemy();
    });
  }

  setUpgradedDamage(damage: number): void {
    this.upgradedDamage = damage;
  }
}
