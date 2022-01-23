import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { ExplosionEffect } from '../../effects/explosion/explosion.effect';

export class HolyOrbProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  biggerBalls: boolean = false;
  massiveBalls: boolean = false;

  line: Phaser.GameObjects.Line;
  innerDelta: number = 0;

  orbRotation: number;

  get realtimeRotation(): number {
    const worldTimeScale: number = this.baseScene.physics.world.timeScale;

    if (worldTimeScale === 0.5) {
      return this.orbRotation * 2;
    }

    return this.orbRotation;
  }

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, HolyOrbProjectile.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.damage = 5;

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
    this.innerDelta += delta;

    if (this.line && this.active && this.visible) {
      this.line.rotation += this.realtimeRotation;
      this.x = this.line.getBottomRight().x;
      this.y = this.line.getBottomRight().y;
    }
  }

  onHitTarget(target: BaseEnemy): void {
    this.damageEnemy(target, this.damage);
  }

  private damageEnemy(enemy: BaseEnemy, damage: number): void {
    enemy.takeDamage(damage);
    this.effectManager.playEffectOn(ExplosionEffect.SPRITE_KEY, ExplosionEffect.EFFECT_KEY, enemy);
  }

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
  }

  startOrbit(centerX: number, centerY: number, rotationSpeed: number, rotationDistance: number, reverseOrbit: boolean): void {
    this.line = this.baseScene.add.line(centerX, centerY, 0, 0, rotationDistance, rotationDistance, 0xff0000);
    this.line.setOrigin(0.5, 0.5);
    this.line.setScale(1);
    this.line.setLineWidth(2);
    this.line.setAlpha(0);
    this.orbRotation = rotationSpeed;

    if (reverseOrbit) {
      this.line.rotation = 3.14159; // 180° in radians
    }
  }

  override destroyEnemy(): void {
    this.line?.destroy();
    super.destroyEnemy();
  }
}

