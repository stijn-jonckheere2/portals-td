import Phaser from 'phaser';
import { BaseUnit } from '../../enemies/base/base.unit';
import { BaseScene } from '../../scenes/base.scene';

export class BaseEffect extends Phaser.Physics.Arcade.Sprite {
  spriteKey: string;
  effectKey: string;
  target: BaseUnit;

  get baseScene(): BaseScene {
    return this.scene as BaseScene;
  }

  get bodyDynamic(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string, effectKey: string) {
    super(scene, x, y, spriteKey, effectKey);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.effectKey = effectKey;

    this.on('animationcomplete', (animation) => {
      if (animation.key === this.effectKey) {
        this.destroy();
      }
    }, this);
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

  playOn(target: BaseUnit): void {
    this.target = target;
    this.play(this.effectKey, true);
    this.placeEffect();
  }
}
