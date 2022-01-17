

import { BaseUnit } from '../../enemies/base/base.unit';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';

export class PortalPlaceholder extends BaseUnit {
  SPRITE_KEY: string;
  SPRITE_URL: string;
  PORTAL_ELEMENT: PortalElement;

  spawnX: number;
  spawnY: number;

  constructor(scene: BaseScene, x: number, y: number, portalClass: any) {
    super(scene, x, y, portalClass.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.SPRITE_KEY = portalClass.SPRITE_KEY;
    this.SPRITE_URL = portalClass.SPRITE_URL;
    this.PORTAL_ELEMENT = portalClass.PORTAL_ELEMENT;

    this.spawnX = x;
    this.spawnY = y;

    this.setFrame(this.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();
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

  resetPosition(): void {
    this.body.reset(this.spawnX, this.spawnY);
  }

  destroyEnemy(): void {
    this.stopEvents();
    this.destroy(true);
  }
}
