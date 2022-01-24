import Phaser from 'phaser';
import { BasePortal } from '../portals/base/base.portal';
import { BaseScene } from '../scenes/base.scene';
import { BaseProjectile } from './base/base.projectile';

export class BaseProjectileGroup extends Phaser.Physics.Arcade.Group {

  protected upgradedDamage: number = null;

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);
  }

  setUpgradedDamage(damage: number): void {
    this.upgradedDamage = damage;
  }

  protected setPortalParent(portal: BasePortal): void {
    this.children.each((child: BaseProjectile) => {
      child.setParent(portal);
    });
  }
}
