import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BasePortal } from '../../portals/base/base.portal';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectileGroup } from '../base/base-projectile.group';
import { ArcaneMissileProjectile } from './arcane-missile.projectile';

export class ArcaneMissileGroup extends BaseProjectileGroup {

  constructor(scene: BaseScene, parent: BasePortal) {
    super(scene);

    this.createMultiple({
      frameQuantity: 100,
      active: false,
      visible: false,
      key: ArcaneMissileProjectile.SPRITE_KEY,
      classType: ArcaneMissileProjectile
    });

    this.setPortalParent(parent);
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: ArcaneMissileProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return;
    }

    projectile.damage = this.upgradedDamage ? this.upgradedDamage : projectile.damage;

    if (projectile) {
      projectile.setScale(0.5);
      projectile.fire(target.body.center.x, target.body.center.y);

      if (this.upgradedDamage) {
        projectile.trackTarget(target);
      }
    }
  }
}
