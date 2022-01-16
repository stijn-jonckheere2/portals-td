import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';
import { BaseUnit } from '../base/base.unit';
import { initAxolotlAnims } from './axolotl.anims';

export class AxolotlEnemy extends BaseUnit {
  static SPRITE_KEY = 'axolotl';
  static SPRITE_URL = 'assets/sprites/axolotl.png';

  currentDestination: Phaser.Types.Tilemaps.TiledObject;
  nextDestinationIndex: number = 0;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, AxolotlEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvents();
    initAxolotlAnims(this.scene.anims);
  }

  override init(): void {
    super.init();

    this.speed = 200;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  override update(time, delta) {
    super.update(time, delta);

    if (!this.body) {
      return;
    }

    this.setMovementAnimation();
    this.checkCurrentMovement();
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
        this.destroyEnemy();
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

  move(): void {
    const myScene = this.scene as BaseScene;
    this.setNextDestination();
  }

  moveToCurrentDestination(): void {
    const { x, y } = this.currentDestination;
    this.scene.physics.moveTo(this, x, y, this.speed);
  }

  initEvents(): void {
    this.scene.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  destroyEnemy(): void {
    this.stopEvents();
    this.baseScene.enemies = this.baseScene.enemies.filter(e => e.id !== this.id);
    this.destroy();
  }
}
