import Phaser from 'phaser';
import { BaseUnit } from '../../base/base.unit';
import { FirePortal } from '../../portals/fire/fire.portal';
import { OrbElement } from '../orb-element.enum';
import { BaseScene } from '../../scenes/base.scene';

export class Fireball extends BaseUnit {
  static SPRITE_KEY = 'orbs';
  static SPRITE_URL = 'assets/sprites/orbs.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, Fireball.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    this.initEvents();

    this.setFrame(OrbElement.FIRE);
    this.speed = 150;
  }

  init(): void {
    this.setImmovable(true);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);
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
    this.destroy(true);
  }
}
