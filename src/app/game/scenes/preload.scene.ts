import { ExplosionEffect } from "../effects/explosion/explosion.effect";
import { AxolotlEnemy } from "../enemies/axolotl/axolotl.enemy";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { ArcanePortal } from "../portals/arcane/arcane.portal";
import { FireballProjectile } from "../projectiles/fireball/fireball.projectile";
import { BaseScene } from "./base.scene";
import { GrasslandScene } from "./grassland.scene";

export class PreloadScene extends BaseScene {

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: 'preload-scene'
    });
  }

  preload(): void {
    this.load.spritesheet(AxolotlEnemy.SPRITE_KEY, AxolotlEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(ArcanePortal.SPRITE_KEY, ArcanePortal.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(FireballProjectile.SPRITE_KEY, FireballProjectile.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(ExplosionEffect.SPRITE_KEY, ExplosionEffect.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  create(): void {
    this.scene.start(GrasslandScene.KEY);
  }
}
