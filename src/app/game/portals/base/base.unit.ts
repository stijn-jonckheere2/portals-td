import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import * as Guid from 'guid';
import { EventEmitter } from '@angular/core';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseGameScene } from '../../scenes/base-game.scene';

export abstract class BaseUnit extends Phaser.Physics.Arcade.Sprite {
  speed: number = 100;
  health: number = 100;
  firingSpeed: number = 1000;
  maxRange: number = 200;

  dead: boolean = false;
  id: string;

  onUpdate: EventEmitter<BaseUnit> = new EventEmitter();

  get baseScene(): BaseScene {
    return this.scene as BaseScene;
  }

  get baseGameScene(): BaseGameScene {
    return this.scene as BaseGameScene;
  }

  get bodyDynamic(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string) {
    super(scene, x, y, spriteKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.id = Guid.raw();
  }

  init(): void {
    this.setImmovable(true);
    this.setBodySize(16, 16);
  }

  override update(time, delta) {
    super.update(time, delta);
    this.onUpdate.emit(this);

    if (!this.dead && this.health <= 0) {
      this.dead = true;
      this.setTint(0xff0000);

      this.baseScene.time.addEvent({
        delay: 200,
        callback: () => this.destroyEnemy()
      });
    }
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }

  addCollider(collisionTarget, callback?): void {
    this.scene.physics.add.collider(this, collisionTarget, callback, null, this);
  }

  getClosestEnemy(): BaseEnemy {
    const aliveEnemies = this.getAliveEnemies();
    return this.baseScene.physics.closest(this, aliveEnemies) as BaseEnemy;
  }

  getAliveEnemies(): BaseEnemy[] {
    return this.baseScene.enemies.filter(e => !e.isDead);
  }

  getUnpoisonedEnemies(): BaseEnemy[] {
    return this.baseScene.enemies.filter(e => !e.isDead && !e.isPoisoned);
  }

  abstract destroyEnemy(): void;
}
