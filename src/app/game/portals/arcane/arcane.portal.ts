import { BaseUnit } from '../../base/base.unit';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';

export class ArcanePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';

  closestEnemy: BaseUnit;
  triggerTimer: Phaser.Time.TimerEvent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ArcanePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.speed = 100;
    this.setBodySize(32, 32);
    this.setFrame(PortalElement.ARCANE);
    this.init();
    this.initEvents();
  }

  init(): void {
    this.setImmovable(true);

    this.triggerTimer = this.scene.time.addEvent({
      callback: this.absorbNearestTarget,
      callbackScope: this,
      delay: 50, // 1000 = 1 second
      loop: true
    });

  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  absorbNearestTarget(): void {
    const closest = this.scene.physics.closest(this, this.baseScene.enemies);

    if (!closest) {
      return;
    }

    this.closestEnemy = closest as BaseUnit;

    const distanceToClosest = Phaser.Math.Distance.Between(
      this.closestEnemy.body.position.x,
      this.closestEnemy.body.position.y,
      this.body.position.x,
      this.body.position.y,
    );

    if (distanceToClosest <= 200) {
      this.scene.physics.moveTo(this.closestEnemy, this.body.position.x + 32, this.body.position.y + 32, this.speed);
    }

    if (distanceToClosest <= 25) {
      this.closestEnemy.destroyEnemy();
      this.closestEnemy = null;
    }
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
    this.triggerTimer.destroy();
    this.destroy(true);
  }
}
