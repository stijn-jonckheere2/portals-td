import { BaseScene } from '../../scenes/base.scene';
import { BaseEffect } from '../base/base.effect';

export class ArcaneExplosionEffect extends BaseEffect {
  static EFFECT_KEY = 'arcaneExplosionEffect';
  static SPRITE_KEY = 'arcane-explosion-effect';
  static SPRITE_URL = 'assets/sprites/effects/explosion-arcane.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ArcaneExplosionEffect.SPRITE_KEY, ArcaneExplosionEffect.EFFECT_KEY);
  }
}
