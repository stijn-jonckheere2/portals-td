import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import * as Guid from 'guid';
import { EventEmitter } from '@angular/core';

export abstract class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
  speed: number = 100;
  health: number = 100;
  gold: number = 10;
  damage: number = 1;

  dead: boolean = false;
  id: string;

  onUpdate: EventEmitter<BaseEnemy> = new EventEmitter();

  currentDestination: Phaser.Types.Tilemaps.TiledObject;
  nextDestinationIndex: number = 0;

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
    this.initEvents();
  }

  override update(time, delta) {
    super.update(time, delta);

    this.onUpdate.emit(this);

    if (!this.dead && this.health <= 0) {
      this.dead = true;
      this.setTint(0xff0000);

      setTimeout(() => {
        this.destroyEnemy();
      }, 200);
      return;
    }

    if (!this.body) {
      return;
    }

    this.setMovementAnimation();
    this.checkCurrentMovement();
  }

  setMovementAnimation(): void {
    if (this.body.velocity.y > 1) {
      this.play('walkDown', true);
    }

    if (this.body.velocity.x > 1) {
      this.play('walkRight', true);
    }

    if (this.body.velocity.y < -1) {
      this.play('walkUp', true);
    }

    if (this.body.velocity.x < -1) {
      this.play('walkLeft', true);
    }
  }

  startMoving(): void {
    this.setNextDestination();
  }

  checkCurrentMovement(): void {
    if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) || !this.currentDestination) {
      return;
    }

    const distanceToDestination = Phaser.Math.Distance.Between(
      this.body.position.x,
      this.body.position.y,
      this.currentDestination.x,
      this.currentDestination.y,
    );

    if (distanceToDestination <= 20) {
      this.body.reset(this.currentDestination.x, this.currentDestination.y);

      if (this.nextDestinationIndex) {
        this.setNextDestination();
      } else {
        this.baseScene.takeDamage(this.damage);
        this.destroyEnemy(false);
      }
    }
  }

  setNextDestination(): void {
    const myScene = this.scene as BaseScene;
    const nextDestination = myScene.waypoints[this.nextDestinationIndex];

    if (nextDestination) {
      this.currentDestination = nextDestination;
      this.nextDestinationIndex++;
      this.moveToCurrentDestination();
      return;
    }

    this.nextDestinationIndex = null;
    this.currentDestination = myScene.endPoint;
    this.moveToCurrentDestination();
  }

  moveToCurrentDestination(): void {
    const { x, y } = this.currentDestination;
    this.scene.physics.moveTo(this, x, y, this.speed);
  }

  takeDamage(damage: number): void {
    this.health -= damage;
  }

  addCollider(collisionTarget, callback?): void {
    this.scene.physics.add.collider(this, collisionTarget, callback, null, this);
  }

  initEvents(): void {
    this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  destroyEnemy(receiveGold = true): void {
    this.stopEvents();
    this.baseScene.enemies = this.baseScene.enemies.filter(e => e.id !== this.id);

    if (receiveGold) {
      this.baseScene.earnGold(this.gold);
    }

    this.destroy();
  }
}
