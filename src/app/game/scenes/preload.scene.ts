import { FrozenAilment } from "../ailments/frozen/frozen.ailment";
import { ExplosionSnowEffect } from "../effects/explosion/explosion-snow.effect";
import { ExplosionEffect } from "../effects/explosion/explosion.effect";
import { AxolotlEnemy } from "../enemies/axolotl/axolotl.enemy";
import { BabySlimeEnemy } from "../enemies/baby-slime/baby-slime.enemy";
import { BambooEnemy } from "../enemies/bamboo/bamboo.enemy";
import { BeastEnemy } from "../enemies/beast/beast.enemy";
import { ButterflyEnemy } from "../enemies/butterfly/butterfly.enemy";
import { DragonEnemy } from "../enemies/dragon/dragon.enemy";
import { FlameEnemy } from "../enemies/flame/flame.enemy";
import { LarvaEnemy } from "../enemies/larva/larva.enemy";
import { LizardEnemy } from "../enemies/lizard/lizard.enemy";
import { MoleEnemy } from "../enemies/mole/mole.enemy";
import { OctopusEnemy } from "../enemies/octopus/octopus.enemy";
import { OwlEnemy } from "../enemies/owl/owl.enemy";
import { ReptileEnemy } from "../enemies/reptile/reptile.enemy";
import { SkullEnemy } from "../enemies/skull/skull.enemy";
import { SlimeEnemy } from "../enemies/slime/slime.enemy";
import { SpiritEnemy } from "../enemies/spirit/spirit.enemy";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { ArrowDown } from "../other/arrow.sprite";
import { ArcanePortal } from "../portals/arcane/arcane.portal";
import { BasePortal } from "../portals/base/base.portal";
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

    this.load.spritesheet(ExplosionEffect.SPRITE_KEY, ExplosionEffect.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(ExplosionSnowEffect.SPRITE_KEY, ExplosionSnowEffect.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

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

    this.load.spritesheet(LarvaEnemy.SPRITE_KEY, LarvaEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(ButterflyEnemy.SPRITE_KEY, ButterflyEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(BabySlimeEnemy.SPRITE_KEY, BabySlimeEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(BambooEnemy.SPRITE_KEY, BambooEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(BeastEnemy.SPRITE_KEY, BeastEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(DragonEnemy.SPRITE_KEY, DragonEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(FlameEnemy.SPRITE_KEY, FlameEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(LizardEnemy.SPRITE_KEY, LizardEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(OctopusEnemy.SPRITE_KEY, OctopusEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(OwlEnemy.SPRITE_KEY, OwlEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(SkullEnemy.SPRITE_KEY, SkullEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(SlimeEnemy.SPRITE_KEY, SlimeEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(SpiritEnemy.SPRITE_KEY, SpiritEnemy.SPRITE_URL, {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet(BasePortal.SPRITE_KEY, BasePortal.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(BasePortal.SPRITE_1_KEY, BasePortal.SPRITE_1_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(BasePortal.SPRITE_2_KEY, BasePortal.SPRITE_2_URL, {
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

    this.load.spritesheet(FrozenAilment.SPRITE_KEY, FrozenAilment.SPRITE_URL, {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet(ArrowDown.SPRITE_KEY, ArrowDown.SPRITE_URL, {
      frameWidth: 50,
      frameHeight: 50
    });
  }

  override create(): void {
    super.create();

    this.scene.start(GrasslandScene.KEY);
  }
}
