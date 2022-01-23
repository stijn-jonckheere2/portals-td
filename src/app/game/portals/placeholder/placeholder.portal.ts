

import { BaseUnit } from '../base/base.unit';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { ArcanePortal } from '../arcane/arcane.portal';

export class PortalPlaceholder extends BaseUnit {
  SPRITE_KEY: string;
  SPRITE_URL: string;
  PORTAL_ELEMENT: PortalElement;

  spawnX: number;
  spawnY: number;
  radiusCircle: Phaser.GameObjects.Arc;

  constructor(scene: BaseScene, x: number, y: number, portalClass: any, portalRange: number) {
    super(scene, x, y, portalClass.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.SPRITE_KEY = portalClass.SPRITE_KEY;
    this.SPRITE_URL = portalClass.SPRITE_URL;
    this.PORTAL_ELEMENT = portalClass.PORTAL_ELEMENT;

    this.spawnX = x;
    this.spawnY = y;
    this.maxRange = portalRange;

    this.setFrame(this.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();
    this.body.setSize(40, 40);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

    if (this.PORTAL_ELEMENT === PortalElement.ARCANE || this.PORTAL_ELEMENT === PortalElement.MIND) {
      return;
    }

    if (!this.radiusCircle) {
      const myCenter = this.getCenter();
      this.radiusCircle = this.baseScene.add.circle(myCenter.x, myCenter.y, this.maxRange / 2, null, 0);
      this.radiusCircle.setOrigin(0.5, 0.5);
      this.radiusCircle.setScale(1);
      this.radiusCircle.setStrokeStyle(2, 0xFFE000, 1);
      this.radiusCircle.setFillStyle(0xFFE000, 0.1);
      return;
    }

    const myCenter = this.getCenter();
    this.radiusCircle.x = myCenter.x;
    this.radiusCircle.y = myCenter.y;
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
    this.radiusCircle?.destroy(true);
    this.stopEvents();
    this.destroy(true);
  }
}
