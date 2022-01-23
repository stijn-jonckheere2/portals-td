import { ArcaneExplosionEffect } from "../effects/explosion/explosion-arcane.effect";
import { ExplosionSnowEffect } from "../effects/explosion/explosion-snow.effect";
import { ExplosionEffect } from "../effects/explosion/explosion.effect";

export function initExplosionAnim(anims): void {
  const frameRate = 8;

  anims.create({
    key: ExplosionEffect.EFFECT_KEY,
    frames: anims.generateFrameNumbers(ExplosionEffect.SPRITE_KEY, {
      start: 0,
      end: 7,
      prefix: 'explo_',
    }),
    frameRate,
    repeat: 0
  });

  anims.create({
    key: ExplosionSnowEffect.EFFECT_KEY,
    frames: anims.generateFrameNumbers(ExplosionSnowEffect.SPRITE_KEY, {
      start: 0,
      end: 7,
      prefix: 'snow_explo_',
    }),
    frameRate,
    repeat: 0
  });

  anims.create({
    key: ArcaneExplosionEffect.EFFECT_KEY,
    frames: anims.generateFrameNumbers(ArcaneExplosionEffect.SPRITE_KEY, {
      start: 0,
      end: 7,
      prefix: 'arcane_explo_',
    }),
    frameRate,
    repeat: 0
  });
}
