import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { BaseUnit } from '../../enemies/base/base.unit';
import { ExplosionSnowEffect } from '../../effects/explosion/explosion-snow.effect';
import { BaseEnemy } from '../../enemies/base/base.enemy';

export class SnowballProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, SnowballProjectile.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.speed = 400;
    this.maxDistance = 400;
    this.damage = 5;

    this.setFrame(OrbElement.ICE);
    this.setBodySize(32, 32);
  }

  initEvents(): void {
    this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  override onHitTarget(target: BaseEnemy): void {
    if (this.slowTimer) {
      clearTimeout(this.slowTimer);
    }

    this.effectManager.playEffectOn(ExplosionSnowEffect.SPRITE_KEY, ExplosionSnowEffect.EFFECT_KEY, target);

    target.isSlowed = true;
    target.moveToCurrentDestination();

    target.setTintFill(0xB3C3D2);
    target.tintFill = false;

    this.slowTimer = setTimeout(() => {
      target.isSlowed = false;
      target.clearTint();
    }, 7000);

    super.destroyEnemy();
  }

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.moveTo(this, x, y, this.speed);
  }
}
