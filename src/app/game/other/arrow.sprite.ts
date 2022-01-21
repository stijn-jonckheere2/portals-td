
import { BaseUnit } from "../portals/base/base.unit";
import { BaseScene } from "../scenes/base.scene";

export class ArrowDown extends BaseUnit {
  static SPRITE_KEY = 'arrow';
  static SPRITE_URL = 'assets/sprites/arrow.png';

  parent: BaseUnit;

  constructor(scene: BaseScene, x: number, y: number, parent: BaseUnit) {
    super(scene, x, y, ArrowDown.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.parent = parent;

    this.setFrame(0);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();
    this.setScale(0.7);
    this.body.setSize(10, 10);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

    if (!this.body) {
      this.destroy(true);
      return;
    }

    this.body.reset(this.parent.body.center.x, this.parent.body.center.y - 50);
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
