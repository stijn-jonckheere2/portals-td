import { BaseScene } from '../../scenes/base.scene';
import { BaseEffect } from '../base/base.effect';

export class ExplosionEffect extends BaseEffect {
  static EFFECT_KEY = 'explosionEffect';
  static SPRITE_KEY = 'explosion-effect';
  static SPRITE_URL = 'assets/sprites/effects/explosion.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ExplosionEffect.SPRITE_KEY, ExplosionEffect.EFFECT_KEY);
  }

}
