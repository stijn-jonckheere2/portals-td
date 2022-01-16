import { BaseUnit } from '../../base/base.unit';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';

export class IcePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, IcePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(PortalElement.ICE);
    this.init();
    this.initEvents();
  }

  init(): void {
    this.setImmovable(true);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(): void {
    super.update();

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
    this.setActive(false);
    // this.destroy();
  }
}
