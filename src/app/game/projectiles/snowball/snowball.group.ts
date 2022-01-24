import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BasePortal } from '../../portals/base/base.portal';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectileGroup } from '../base/base-projectile.group';
import { SnowballProjectile } from './snowball.projectile';

export class SnowballGroup extends BaseProjectileGroup {

  biggerBalls: boolean = false;
  massiveBalls: boolean = false;

  constructor(scene: BaseScene, parent: BasePortal) {
    super(scene);

    this.createMultiple({
      frameQuantity: 25,
      active: false,
      visible: false,
      key: SnowballProjectile.SPRITE_KEY,
      classType: SnowballProjectile
    });

    this.setPortalParent(parent);
  }

  enableBiggerSnowballs(): void {
    this.biggerBalls = true;
  }

  enableMassiveSnowballs(): void {
    this.massiveBalls = true;
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: SnowballProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return;
    }

    projectile.biggerBalls = this.biggerBalls;
    projectile.massiveBalls = this.massiveBalls;
    projectile.damage = this.upgradedDamage ? this.upgradedDamage : projectile.damage;

    const snowballScale = projectile.massiveBalls ? 1.5 : 1;

    if (projectile) {
      projectile.setScale(snowballScale);
      projectile.fire(target.body.center.x, target.body.center.y);
      projectile.trackTarget(target);
    }
  }
}
