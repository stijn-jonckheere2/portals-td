import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { HolyOrbProjectile } from './holy-orb.projectile';

export class HolyOrbGroup extends Phaser.Physics.Arcade.Group {

  centerPoint: { x: number, y: number };
  upgradedDamage: number = 0;

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 10,
      active: false,
      visible: false,
      key: HolyOrbProjectile.SPRITE_KEY,
      classType: HolyOrbProjectile
    });
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy, rotationSpeed: number, rotationDistance: number, reverseOrbit = false): void {
    const projectile: HolyOrbProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return;
    }

    if (projectile) {
      projectile.damage = this.upgradedDamage > 0 ? this.upgradedDamage : projectile.damage;
      projectile.startOrbit(this.centerPoint.x, this.centerPoint.y, rotationSpeed, rotationDistance, reverseOrbit);
      projectile.fire(null, null);
    }
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
