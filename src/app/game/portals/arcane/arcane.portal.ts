import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BasePortal } from '../base/base.portal';
import { ArcaneMissileGroup } from '../../projectiles/arcane-missile/arcane-missile.group';
import { ArcanePortalUpgrades } from '../../upgrades/arcane/arcane-portal-upgrades.type';
import { ArcaneTurretUpgrade } from '../../upgrades/arcane/arcane-turret/arcane-turret.upgrade';

export class ArcanePortal extends BasePortal {
  static PORTAL_NAME: string = 'Arcane Portal';
  static PORTAL_DESCRIPTION: string = "A long range portal that fires missiles over the entire map";

  static PORTAL_ELEMENT = PortalElement.ARCANE;
  static PORTAL_RANGE: number = 10000;

  triggerTimer: Phaser.Time.TimerEvent;
  arcaneMissiles: ArcaneMissileGroup;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BasePortal.SPRITE_KEY, PortalElement.ARCANE);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(ArcanePortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 450;
    this.maxRange = ArcanePortal.PORTAL_RANGE;

    this.price = PortalPrice.ARCANE;
    this.arcaneMissiles = new ArcaneMissileGroup(this.baseScene);
    this.body.setSize(40, 40);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

  }

  override toggleRadiusVisible(flag: boolean): void {
      return;
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
      this.arcaneMissiles.fireProjectile(fireballX, fireballY, closestEnemy);
    }
  }

  addUpgrade(upgrade: ArcanePortalUpgrades): void {
    this.upgrade();

    if (upgrade instanceof ArcaneTurretUpgrade) {
      this.arcaneMissiles.upgradedDamage = 100;
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
