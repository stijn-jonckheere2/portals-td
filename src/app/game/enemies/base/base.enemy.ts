import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import * as Guid from 'guid';
import { EventEmitter } from '@angular/core';
import { AilmentType } from '../../ailments/ailment-type.enum';
import { FrozenAilment } from '../../ailments/frozen/frozen.ailment';
import { PoisonedAilment } from '../../ailments/poisoned/poisoned.ailment';

export abstract class BaseEnemy extends Phaser.Physics.Arcade.Sprite {
  static MIN_WAVE: number = 1;
  static MAX_WAVE: number = 100;
  static BASE_HEALTH: number = 25;
  static HEALTH: number = 100;
  static DISTANCE_TO_SIBLING: number = 500;
  static SCALE: number = 2;

  baseSpeed: number = 100;
  gold: number = 10;
  damage: number = 1;

  isDead: boolean = false;
  isSlowed: boolean = false;
  isPoisoned: boolean = false;
  isBeingDestroyed: boolean = false;
  id: string;
  currentHealth: number;

  frozenAilment: { ailment: FrozenAilment, timer: Phaser.Time.TimerEvent };

  poisonAilment: PoisonedAilment;
  poisonTimer: Phaser.Time.TimerEvent;

  traveledDistanceX: number = 0;
  traveledDistanceY: number = 0;

  get actualSpeed(): number {
    if (this.isSlowed) {
      return this.baseSpeed / 2;
    }

    return this.baseSpeed;
  }

  onUpdate: EventEmitter<BaseEnemy> = new EventEmitter();

  currentDestination: Phaser.Types.Tilemaps.TiledObject;
  nextDestinationIndex: number = 0;

  get baseScene(): BaseScene {
    return this.scene as BaseScene;
  }

  get bodyDynamic(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  get travelDistance(): number {
    return this.traveledDistanceX + this.traveledDistanceY;
  }

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string) {
    super(scene, x, y, spriteKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.id = Guid.raw();
  }

  init(): void {
    this.setImmovable(true);
    this.setPushable(false);
    this.setBodySize(10, 10);
    this.initEvents();
  }

  override preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (this.isBeingDestroyed) {
      return;
    }

    if (this.body && this.active) {
      this.traveledDistanceX += this.body.deltaAbsX();
      this.traveledDistanceY += this.body.deltaAbsY();
    }
  }

  override update(time, delta) {
    super.update(time, delta);
    this.onUpdate.emit(this);

    if (this.isBeingDestroyed) {
      return;
    }

    if (this.isDead) {
      this.destroyEnemy();
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

  startMoving(nextDestinationIndex?: number): void {
    this.setNextDestination(nextDestinationIndex);
  }

  setNextDestination(nextDestinationIndex?: number): void {
    const myScene = this.scene as BaseScene;
    this.nextDestinationIndex = nextDestinationIndex ?? this.nextDestinationIndex;
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
    this.scene?.physics.moveTo(this, x, y, this.actualSpeed);
  }

  checkCurrentMovement(): void {
    if ((this.body.velocity.x === 0 && this.body.velocity.y === 0) || !this.currentDestination) {
      return;
    }

    const distanceToDestination = Phaser.Math.Distance.Between(
      this.body.center.x,
      this.body.center.y,
      this.currentDestination.x,
      this.currentDestination.y,
    );

    if (distanceToDestination <= 10) {
      this.body.reset(this.currentDestination.x, this.currentDestination.y);

      if (this.nextDestinationIndex) {
        this.setNextDestination();
      } else {
        this.baseScene.takeDamage(this.damage);
        this.destroyEnemy(false);
      }
    }
  }

  takeDamage(damage: number): void {
    if (!this.isDead) {
      this.currentHealth -= damage;
    }

    if (this.currentHealth <= 0) {
      this.isDead = true;
    }
  }

  setAilment(type: AilmentType, duration: number): void {
    const { x, y } = this.body;

    switch (type) {
      case AilmentType.FROZEN:
        this.setFrozenAilment(x, y, duration);
        break;
    };
  }

  private setFrozenAilment(x: number, y: number, duration: number): void {
    let ailment: FrozenAilment = this.frozenAilment?.ailment;

    if (ailment) {
      this.frozenAilment.timer.remove();
    } else {
      this.isSlowed = true;
      ailment = new FrozenAilment(this.baseScene, x - 10, y - 10, this);
    }

    this.frozenAilment = {
      ailment,
      timer: this.baseScene.time.addEvent({
        delay: duration,
        callback: () => {
          this.frozenAilment.ailment.destroyEnemy();
          this.frozenAilment = null;
          this.isSlowed = false;
          this.moveToCurrentDestination();
        }
      })
    }
  }

  addCollider(collisionTarget, callback?): void {
    this.scene.physics.add.collider(this, collisionTarget, callback, null, this);
  }

  addOverlapCollider(collisionTarget, callback?): void {
    this.scene.physics.add.overlap(this, collisionTarget, callback, null, this);
  }

  initEvents(): void {
    this.scene?.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene?.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  clearAilments(): void {
    this.frozenAilment?.timer.remove();
    this.frozenAilment?.ailment.destroyEnemy();
  }

  destroyEnemy(receiveGold = true): void {
    if (this.isBeingDestroyed) {
      return;
    }

    this.isBeingDestroyed = true;

    this.clearAilments();
    this.stopEvents();

    if (this.baseScene && this.baseScene.enemies) {
      this.baseScene.enemies = this.baseScene.enemies.filter(e => e.id !== this.id);
    }

    if (receiveGold) {
      this.baseScene?.earnGold(this.gold);
    }

    this.baseScene.time.addEvent({
      delay: 150,
      callback: () => super.destroy()
    });
  }
}
