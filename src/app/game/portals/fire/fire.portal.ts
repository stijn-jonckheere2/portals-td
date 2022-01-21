import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseUnit } from '../base/base.unit';
import { FireballGroup } from '../../projectiles/fireball/fireball.group';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BaseUpgrade } from '../../upgrades/base/base.upgrade';
import { FirePortalUpgrades } from '../../upgrades/fire/fire-portal-upgrades.type';

export class FirePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';
  static PORTAL_ELEMENT = PortalElement.FIRE;

  triggerTimer: Phaser.Time.TimerEvent;
  fireballs: FireballGroup;

  upgrades = {
    explosiveBullets: false
  };

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, FirePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(FirePortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 450;
    this.maxRange = 250;

    this.price = PortalPrice.FIRE;
    this.fireballs = new FireballGroup(this.baseScene);
    this.body.setSize(40, 40);

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
      callback: this.shootNearestTarget,
      callbackScope: this,
      delay: this.firingSpeed, // 1000 = 1 second
      loop: true
    });
  }

  shootNearestTarget(): void {
    const closest = this.getClosestEnemy();

    if (!closest || !(closest as BaseEnemy).body) {
      return;
    }

    const closestEnemy = closest as BaseEnemy;

    const distanceToClosest = Phaser.Math.Distance.Between(
      closestEnemy.body.position.x,
      closestEnemy.body.position.y,
      this.body.position.x,
      this.body.position.y,
    );

    if (distanceToClosest <= this.maxRange) {
      const fireballX = this.body.position.x + 32;
      const fireballY = this.body.position.y + 32;
      this.fireballs.fireProjectile(fireballX, fireballY, closestEnemy);
    }
  }

  addUpgrade(upgrade: any): void {
    const up = new upgrade(this) as FirePortalUpgrades;
    up.onPurchase();
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
