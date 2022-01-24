import Phaser from 'phaser';
import { BasePortal } from '../../portals/base/base.portal';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectileGroup } from '../base-projectile.group';
import { BaseProjectile } from '../base/base.projectile';
import { HolyOrbProjectile } from './holy-orb.projectile';

export class HolyOrbGroup extends BaseProjectileGroup {

  constructor(scene: BaseScene, parent: BasePortal) {
    super(scene);

    this.createMultiple({
      frameQuantity: 6,
      active: false,
      visible: false,
      key: HolyOrbProjectile.SPRITE_KEY,
      classType: HolyOrbProjectile,
    });

    this.setPortalParent(parent);
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
}
