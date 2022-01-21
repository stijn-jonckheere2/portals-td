import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { FirePortalUpgrades } from '../../upgrades/fire/fire-portal-upgrades.type';
import { BasePortal } from '../base/base.portal';
import { ExplosiveBulletsUpgrade } from '../../upgrades/fire/explosive-bullets/explosive-bullets.upgrade';
import { ArcaneMissileGroup } from '../../projectiles/arcane-missile/arcane-missile.group';
import { ArcanePortalUpgrades } from '../../upgrades/arcane/arcane-portal-upgrades.type';
import { ArcaneBarrageUpgrade } from '../../upgrades/arcane/arcane-barrage/arcane-barrage.upgrade';
import { ArcaneTurretUpgrade } from '../../upgrades/arcane/arcane-turret/arcane-turret.upgrade';

export class ArcanePortal extends BasePortal {
  static PORTAL_ELEMENT = PortalElement.ARCANE;

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

    this.firingSpeed = 500;
    this.maxRange = 2000;

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
    console.log('arcane firing speed', this.firingSpeed);
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

  destroyEnemy(): void {
    this.stopEvents();
    this.triggerTimer?.destroy();
    this.destroy(true);
  }
}
