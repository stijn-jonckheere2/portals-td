import Phaser from 'phaser';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';
import { BaseProjectile } from '../base/base.projectile';

export class FireballProjectile extends BaseProjectile {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, FireballProjectile.SPRITE_KEY);

    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.speed = 200;
    this.maxDistance = 400;
    this.damage = 50;

    this.setFrame(OrbElement.FIRE);
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

  override fire(x: number, y: number): void {
    this.setActive(true);
    this.setVisible(true);
    this.scene.physics.moveTo(this, x, y, this.speed);
  }
}
