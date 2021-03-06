import { BaseEnemy } from '../../enemies/base/base.enemy';
import { FireballGroup } from '../../projectiles/fireball/fireball.group';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { FirePortalUpgrades } from '../../upgrades/fire/fire-portal-upgrades.type';
import { BasePortal } from '../base/base.portal';
import { ExplosiveBulletsUpgrade } from '../../upgrades/fire/explosive-bullets/explosive-bullets.upgrade';
import { FasterBulletsUpgrade } from '../../upgrades/fire/faster-bullets/faster-bullets.upgrade';

export class FirePortal extends BasePortal {
  static PORTAL_NAME: string = 'Fire Portal';
  static PORTAL_DESCRIPTION: string = "Shoots at nearby enemies, dealing damage with fire orbs";
  static PORTAL_ELEMENT = PortalElement.FIRE;
  static PORTAL_RANGE: number = 250;

  triggerTimer: Phaser.Time.TimerEvent;
  fireballs: FireballGroup;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BasePortal.SPRITE_KEY, PortalElement.FIRE);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(FirePortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 450;
    this.maxRange = FirePortal.PORTAL_RANGE;

    this.price = PortalPrice.FIRE;
    this.fireballs = new FireballGroup(this.baseScene, this);
    this.body.setSize(40, 40);
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

  stopShooting(): void {
    this.triggerTimer.remove();
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

  addUpgrade(upgrade: FirePortalUpgrades): void {
    this.upgrade();

    if (upgrade instanceof FasterBulletsUpgrade) {
      this.fireballs.setUpgradedDamage(50);
    }

    if (upgrade instanceof ExplosiveBulletsUpgrade) {
      this.fireballs.setUpgradedDamage(70);
      this.fireballs.enableExplosiveProjectiles();
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

  override destroyEnemy(): void {
    super.destroyEnemy();
    this.stopEvents();
    this.triggerTimer?.destroy();
    this.destroy(true);
  }
}
