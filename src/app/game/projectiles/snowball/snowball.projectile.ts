import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { ExplosionSnowEffect } from '../../effects/explosion/explosion-snow.effect';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { AilmentType } from '../../ailments/ailment-type.enum';

export class SnowballProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  biggerBalls: boolean = false;
  massiveBalls: boolean = false;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, SnowballProjectile.SPRITE_KEY, ExplosionSnowEffect.EFFECT_KEY, ExplosionSnowEffect.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.speed = 400;
    this.maxDistance = 400;
    this.damage = 20;

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

  onHitTarget(target: BaseEnemy): void {
    this.damageEnemy(target, this.damage);

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

    closeEnemies.some((enemy, i) => {
      if (this.biggerBalls && i < 5) {
        // Don't damage the AoE snowballs + slow 4 targets
        this.damageEnemy(enemy, 0);
        return false;
      }

      if (this.massiveBalls && i < 10) {
        // Don't damage the AoE snowballs + slow 8 targets
        this.damageEnemy(enemy, 0);
        return false;
      }

      if (i < 2) {
        // Don't damage the AoE snowballs + slow 2 targets
        this.damageEnemy(enemy, 0);
      }

      return true;
    });

    this.destroyEnemy();
  }

  override damageEnemy(enemy: BaseEnemy, damage: number): void {
    super.damageEnemy(enemy, damage);

    if(!enemy.isDead) {
      enemy.setAilment(AilmentType.FROZEN, 7000);
      enemy.moveToCurrentDestination();
    }
  }

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.moveTo(this, x, y, this.speed);
  }
}
