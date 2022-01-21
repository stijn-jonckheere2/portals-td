import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { ExplosionEffect } from '../../effects/explosion/explosion.effect';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { ArcaneExplosionEffect } from '../../effects/explosion/explosion-arcane.effect';

export class ArcaneMissileProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ArcaneMissileProjectile.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.speed = 2000;
    this.maxDistance = 2000;
    this.damage = 50;

    this.setFrame(OrbElement.FIRE);
    this.setBodySize(16, 16);
  }

  initEvents(): void {
    this.scene?.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene?.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.moveTo(this, x, y, this.speed);
  }

  onHitTarget(target: BaseEnemy): void {
    this.damageEnemy(target, this.damage);
    this.destroyEnemy();
  }

  private damageEnemy(enemy: BaseEnemy, damage: number): void {
    enemy.takeDamage(damage);
    this.effectManager.playEffectOn(ArcaneExplosionEffect.SPRITE_KEY, ArcaneExplosionEffect.EFFECT_KEY, enemy);
  }
}
