import { BaseUnit } from '../../enemies/base/base.unit';
import { FireballGroup } from '../../projectiles/fireball/fireball.group';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';

export class FirePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';

  triggerTimer: Phaser.Time.TimerEvent;
  ammo: number = 1;
  fireballs: FireballGroup;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, FirePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(PortalElement.FIRE);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();
    this.fireballs = new FireballGroup(this.baseScene);

    this.triggerTimer = this.scene.time.addEvent({
      callback: this.shootNearestTarget,
      callbackScope: this,
      delay: 1000, // 1000 = 1 second
      loop: true
    });
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  shootNearestTarget(): void {
    const closest = this.scene.physics.closest(this, this.baseScene.enemies);

    if (!closest || !(closest as BaseUnit).body) {
      return;
    }

    const closestEnemy = closest as BaseUnit;

    const distanceToClosest = Phaser.Math.Distance.Between(
      closestEnemy.body.position.x,
      closestEnemy.body.position.y,
      this.body.position.x,
      this.body.position.y,
    );

    if (distanceToClosest <= 200) {
      const fireballX = this.body.position.x + 32;
      const fireballY = this.body.position.y + 32;
      this.fireballs.fireProjectile(fireballX, fireballY, closestEnemy);
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
