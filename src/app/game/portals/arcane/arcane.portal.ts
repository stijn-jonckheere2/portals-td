import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseUnit } from '../base/base.unit';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';

export class ArcanePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';
  static PORTAL_ELEMENT = PortalElement.ARCANE;

  triggerTimer: Phaser.Time.TimerEvent;

  closestEnemy: BaseEnemy;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ArcanePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(ArcanePortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 4000;
    this.maxRange = 350;
    this.price = PortalPrice.ARCANE;

    this.body.setSize(10, 10);
    this.startShooting();
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  startShooting(): void {
    this.triggerTimer = this.scene.time.addEvent({
      callback: this.absorbNearestTarget,
      callbackScope: this,
      delay: this.firingSpeed, // 1000 = 1 second
      loop: true
    });
  }

  absorbNearestTarget(): void {
    if (this.closestEnemy) {
      return;
    }

    const closest = this.getClosestEnemy();

    if (!closest) {
      return;
    }

    const distanceToClosest = Phaser.Math.Distance.Between(
      closest.body.position.x,
      closest.body.position.y,
      this.body.position.x,
      this.body.position.y,
    );

    if (distanceToClosest <= 250) {
      this.closestEnemy = closest;
      this.closestEnemy.isDead = true;

      this.closestEnemy.addCollider(this, () => {
        console.log('collide')
        this.closestEnemy.destroyEnemy();
        this.closestEnemy = null;
      });

      this.scene.physics.moveTo(this.closestEnemy, this.body.center.x, this.body.center.y, 150, 1000);
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
