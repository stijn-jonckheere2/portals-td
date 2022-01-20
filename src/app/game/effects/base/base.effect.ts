import Phaser from 'phaser';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';

export class BaseEffect extends Phaser.Physics.Arcade.Sprite {
  spriteKey: string;
  effectKey: string;
  target: BaseEnemy;

  get baseScene(): BaseScene {
    return this.scene as BaseScene;
  }

  get bodyDynamic(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string, effectKey: string) {
    super(scene, x, y, spriteKey, effectKey);

    this.effectKey = effectKey;

    this.on('animationcomplete', (animation) => {
      if (animation.key === this.effectKey) {
        this.destroy();
      }
    }, this);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  override preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.placeEffect();
  }

  placeEffect(): void {
    if (!this.target || !this.body) {
      return;
    }

    const targetCenter = this.target.getCenter();
    this.body.reset(targetCenter.x, targetCenter.y);
  }

  playOn(target: BaseEnemy): void {
    this.target = target;
    this.play(this.effectKey, true);
    this.placeEffect();
  }
}
