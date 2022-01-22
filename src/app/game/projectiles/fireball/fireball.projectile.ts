import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { ExplosionEffect } from '../../effects/explosion/explosion.effect';
import { BaseEnemy } from '../../enemies/base/base.enemy';

export class FireballProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  explosive: boolean = false;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, FireballProjectile.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.speed = 400;
    this.maxDistance = 400;
    this.damage = 35;

    this.setFrame(OrbElement.FIRE);
    this.setBodySize(16, 16);
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

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.moveTo(this, x, y, this.speed);
  }

  onHitTarget(target: BaseEnemy): void {
    this.damageEnemy(target, this.damage);

    if (!this.explosive) {
      this.destroyEnemy();
      return;
    }

    const aliveEnemies = this.baseScene.enemies.filter(enemy => !enemy.isDead);

    const closeEnemies = aliveEnemies.filter(enemy => {
      const distance = Phaser.Math.Distance.Between(
        enemy.body.center.x,
        enemy.body.center.y,
        this.body.center.x,
        this.body.center.y,
      );

      return distance < 150;
    });

    const enemiesByDistance = closeEnemies.sort((a: BaseEnemy, b: BaseEnemy) => {
      const distanceA = Phaser.Math.Distance.Between(
        a.body.center.x,
        a.body.center.y,
        this.body.center.x,
        this.body.center.y,
      );

      const distanceB = Phaser.Math.Distance.Between(
        a.body.center.x,
        a.body.center.y,
        this.body.center.x,
        this.body.center.y,
      );

      return distanceA > distanceB ? 0 : 1;
    });

    enemiesByDistance.some((enemy, i) => {
      if (i < 4) {
        this.damageEnemy(enemy, this.damage);
        return false;
      }
      return true;
    });

    this.destroyEnemy();
  }

  private damageEnemy(enemy: BaseEnemy, damage: number): void {
    enemy.takeDamage(damage);
    this.effectManager.playEffectOn(ExplosionEffect.SPRITE_KEY, ExplosionEffect.EFFECT_KEY, enemy);
  }
}
