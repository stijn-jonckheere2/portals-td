import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { MindOrbProjectile } from './mind-orb.projectile';

export class MindOrbGroup extends Phaser.Physics.Arcade.Group {

  upgradedDamage: number = null;

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 100,
      active: false,
      visible: false,
      key: MindOrbProjectile.SPRITE_KEY,
      classType: MindOrbProjectile
    });
  }

  fireProjectile(spawnX: number, spawnY: number, target: BaseEnemy): void {
    const projectile: MindOrbProjectile = this.getFirstDead(false, spawnX, spawnY);

    if (!projectile) {
      console.error('Could not find projectile!');
      return;
    }

    const upgraded: boolean = this.upgradedDamage !== null;
    projectile.damage = upgraded ? this.upgradedDamage : projectile.damage;

    if (projectile) {
      projectile.setScale(0.4);
      projectile.fire(target.body.center.x, target.body.center.y);
      projectile.trackTarget(target);
    }
  }
}
