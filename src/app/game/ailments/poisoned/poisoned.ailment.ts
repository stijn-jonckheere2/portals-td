import { BaseEnemy } from "../../enemies/base/base.enemy";
import { BasePortal } from "../../portals/base/base.portal";
import { BaseUnit } from "../../portals/base/base.unit";
import { BaseScene } from "../../scenes/base.scene";
import { AilmentType } from "../ailment-type.enum";

export class PoisonedAilment extends BaseUnit {
  static SPRITE_KEY = 'ailments';
  static SPRITE_URL = 'assets/sprites/ailments.png';
  static AILMENT_TYPE = AilmentType.POISONED;

  target: BaseEnemy;
  parent: BasePortal;
  tickDamage: number;
  tickTimer: Phaser.Time.TimerEvent;

  constructor(scene: BaseScene, x: number, y: number, tickDamage: number, firingSpeed: number, target: BaseEnemy, parent: BasePortal) {
    super(scene, x, y, PoisonedAilment.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.parent = parent;
    this.target = target;
    this.tickDamage = tickDamage;
    this.firingSpeed = firingSpeed;

    this.setFrame(PoisonedAilment.AILMENT_TYPE);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    if (this.target.isPoisoned) {
      this.destroyEnemy();
      return;
    }

    this.target.isPoisoned = true;

    this.tickTimer = this.baseScene.time.addEvent({
      loop: true,
      delay: this.firingSpeed,
      callback: () => this.damageEnemy(this.target, this.tickDamage)
    });

    this.baseScene.time.addEvent({
      delay: 5000,
      callback: () => this.destroyEnemy()
    });

    this.body.setSize(20, 20);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

    if (!this.body) {
      return;
    }

    if(this.target.isDead) {
      this.destroyEnemy();
      return;
    }

    this.body.reset(this.target.x - 10, this.target.y - 20);
  }

  damageEnemy(enemy: BaseEnemy, damage: number): void {
    if (enemy.isDead) {
      return;
    }

    enemy.takeDamage(damage);

    if (enemy.isDead) {
      this.alertParentOfKill();
      this.destroyEnemy();
    }
  }

  alertParentOfKill(): void {
    this.parent?.addKill();
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
    if (this.target && !this.target.isDead) {
      this.target.isPoisoned = false;
    }

    this.stopEvents();
    this.tickTimer?.remove();
    this.destroy(true);
  }
}
