import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { SnowballProjectile } from './snowball.projectile';

export class SnowballGroup extends Phaser.Physics.Arcade.Group {

  biggerBalls: boolean = false;
  massiveBalls: boolean = false;

  constructor(scene: BaseScene) {
    super(scene.physics.world, scene);

    this.createMultiple({
      frameQuantity: 25,
      active: false,
      visible: false,
      key: SnowballProjectile.SPRITE_KEY,
      classType: SnowballProjectile
    });
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

    const snowballScale = projectile.massiveBalls ? 1.5 : 1;

    if (projectile) {
      projectile.setScale(snowballScale);
      projectile.fire(target.body.center.x, target.body.center.y);
      projectile.trackTarget(target);
    }
  }
}
