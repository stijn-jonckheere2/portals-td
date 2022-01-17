import { ExplosionSnowEffect } from "../effects/explosion/explosion-snow.effect";
import { ExplosionEffect } from "../effects/explosion/explosion.effect";


export function initExplosionAnim(anims): void {
  const frameRate = 10;

  anims.create({
    key: ExplosionEffect.EFFECT_KEY,
    frames: anims.generateFrameNumbers(ExplosionEffect.SPRITE_KEY, {
      start: 0,
      end: 6
    }),
    frameRate,
    repeat: 0
  });

  anims.create({
    key: ExplosionSnowEffect.EFFECT_KEY,
    frames: anims.generateFrameNumbers(ExplosionSnowEffect.SPRITE_KEY, {
      start: 0,
      end: 6
    }),
    frameRate,
    repeat: 0
  });
}
