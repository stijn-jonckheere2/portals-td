import { BaseScene } from '../../scenes/base.scene';
import { BaseEffect } from '../base/base.effect';

export class ExplosionSnowEffect extends BaseEffect {
  static EFFECT_KEY = 'snowExplosionEffect';
  static SPRITE_KEY = 'snow-explosion-effect';
  static SPRITE_URL = 'assets/sprites/effects/explosion-snow.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ExplosionSnowEffect.SPRITE_KEY, ExplosionSnowEffect.EFFECT_KEY);
  }

}
