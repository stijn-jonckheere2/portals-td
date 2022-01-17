import { ExplosionSnowEffect } from "../effects/explosion/explosion-snow.effect";
import { ExplosionEffect } from "../effects/explosion/explosion.effect";
import { AxolotlEnemy } from "../enemies/axolotl/axolotl.enemy";
import { MoleEnemy } from "../enemies/mole/mole.enemy";
import { ReptileEnemy } from "../enemies/reptile/reptile.enemy";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { ArcanePortal } from "../portals/arcane/arcane.portal";
import { FireballProjectile } from "../projectiles/fireball/fireball.projectile";
import { SnowballProjectile } from "../projectiles/snowball/snowball.projectile";
import { BaseScene } from "./base.scene";
import { GrasslandScene } from "./grassland.scene";

export class PreloadScene extends BaseScene {

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: 'preload-scene'
    });
  }

  override preload(): void {
    super.preload();

    this.load.spritesheet(AxolotlEnemy.SPRITE_KEY, AxolotlEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(MoleEnemy.SPRITE_KEY, MoleEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(ReptileEnemy.SPRITE_KEY, ReptileEnemy.SPRITE_URL, {
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

    this.load.spritesheet(SnowballProjectile.SPRITE_KEY, SnowballProjectile.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(ExplosionEffect.SPRITE_KEY, ExplosionEffect.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(ExplosionSnowEffect.SPRITE_KEY, ExplosionSnowEffect.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });
  }

  override create(): void {
    super.create();

    this.scene.start(GrasslandScene.KEY);
  }
}
