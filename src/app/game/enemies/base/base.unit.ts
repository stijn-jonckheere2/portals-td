import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import * as Guid from 'guid';
import { EventEmitter } from '@angular/core';

export abstract class BaseUnit extends Phaser.Physics.Arcade.Sprite {
  speed: number = 100;
  health: number = 100;

  id: string;

  onUpdate: EventEmitter<BaseUnit> = new EventEmitter();

  get baseScene(): BaseScene {
    return this.scene as BaseScene;
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

    if (this.health <= 0) {
      this.destroyEnemy();
    }
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }

  addCollider(collisionTarget, callback?): void {
    this.scene.physics.add.collider(this, collisionTarget, callback, null, this);
  }

  abstract destroyEnemy(): void;
}
