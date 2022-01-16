import { BaseUnit } from '../../base/base.unit';
import { Fireball } from '../../projectiles/fireball/fireball.projectile';
import { Fireballs } from '../../projectiles/fireball/fireballs.group';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';

export class FirePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';

  closestEnemy: BaseUnit;
  triggerTimer: Phaser.Time.TimerEvent;
  ammo: number = 1;
  fireballs: Fireballs;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, FirePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(PortalElement.FIRE);
    this.init();
    this.initEvents();
  }

  init(): void {
    this.setImmovable(true);
    this.fireballs = new Fireballs(this.baseScene);

    this.triggerTimer = this.scene.time.addEvent({
      callback: this.shootNearestTarget,
      callbackScope: this,
      delay: 100, // 1000 = 1 second
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

    this.closestEnemy = closest as BaseUnit;

    const distanceToClosest = Phaser.Math.Distance.Between(
      this.closestEnemy.body.position.x,
      this.closestEnemy.body.position.y,
      this.body.position.x,
      this.body.position.y,
    );

    if (distanceToClosest <= 100) {
      // Shoot fireball
      const fireballX = this.body.position.x + 32;
      const fireballY = this.body.position.y + 32;

      const fireball = new Fireball(this.baseScene, fireballX, fireballY);

      fireball
        .setOrigin(0.5)
        .setScale(1);

      this.scene.physics.moveToObject(fireball, this.closestEnemy, fireball.speed);

      // this.closestEnemy.destroyEnemy();
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
