import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { remove } from 'lodash';
import { ExplosionEffect } from '../../effects/explosion/explosion.effect';

export class HolyOrbProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  enemiesOnCooldown: string[] = [];

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, HolyOrbProjectile.SPRITE_KEY, ExplosionEffect.EFFECT_KEY, ExplosionEffect.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.damage = 25;

    this.setScale(1);
    this.setOrigin(0.5, 0.5);
    this.setFrame(OrbElement.HOLY);
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
  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  onHitTarget(target: BaseEnemy): void {
    if (this.enemyIsOnCooldown(target.id)) {
      return;
    }

    this.enemiesOnCooldown.push(target.id);
    this.damageEnemy(target, this.damage);
    this.takeEnemyOffCooldown(target.id);
  }

  enemyIsOnCooldown(enemyId: string): boolean {
    return this.enemiesOnCooldown.includes(enemyId);
  }

  takeEnemyOffCooldown(enemyId: string): void {
    this.baseScene.time.addEvent({
      delay: 1000,
      callback: () => {
        const removed = remove(this.enemiesOnCooldown, (cooldownId) => {
          return cooldownId === enemyId;
        });
      }
    });
  }

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
  }

  override destroyEnemy(): void {
    super.destroyEnemy();
  }
}

