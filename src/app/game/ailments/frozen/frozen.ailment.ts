import { BaseEnemy } from "../../enemies/base/base.enemy";
import { BaseUnit } from "../../portals/base/base.unit";
import { BaseScene } from "../../scenes/base.scene";
import { AilmentType } from "../ailment-type.enum";

export class FrozenAilment extends BaseUnit {
  static SPRITE_KEY = 'ailments';
  static SPRITE_URL = 'assets/sprites/ailments.png';
  static AILMENT_TYPE = AilmentType.FROZEN;

  parent: BaseEnemy;

  constructor(scene: BaseScene, x: number, y: number, parent: BaseEnemy) {
    super(scene, x, y, FrozenAilment.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.parent = parent;

    this.setFrame(FrozenAilment.AILMENT_TYPE);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.body.setSize(20, 20);
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

    this.body.reset(this.parent.x - 10, this.parent.y - 10);
  }

  initEvents(): void {
    this.scene?.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene?.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  destroyEnemy(): void {
    this.stopEvents();
    this.destroy(true);
  }
}
