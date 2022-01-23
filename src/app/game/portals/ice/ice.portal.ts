import { BaseEnemy } from '../../enemies/base/base.enemy';
import { SnowballGroup } from '../../projectiles/snowball/snowball.group';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BasePortal } from '../base/base.portal';
import { IcePortalUpgrades } from '../../upgrades/ice/ice-portal-upgrades.type';
import { BiggerSnowballsUpgrade } from '../../upgrades/ice/bigger-snowballs/bigger-snowballs.upgrade';
import { MassiveSnowballsUpgrade } from '../../upgrades/ice/massive-snowballs/massive-snowballs.upgrade';

export class IcePortal extends BasePortal {
  static PORTAL_ELEMENT = PortalElement.ICE;
  static PORTAL_RANGE: number = 200;

  triggerTimer: Phaser.Time.TimerEvent;
  snowballs: SnowballGroup;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BasePortal.SPRITE_KEY, PortalElement.ICE);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(IcePortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 700;
    this.maxRange = IcePortal.PORTAL_RANGE;

    this.snowballs = new SnowballGroup(this.baseScene);
    this.body.setSize(40, 40);
    this.price = PortalPrice.ICE;
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
      const projectileX = this.body.position.x + 32;
      const projectileY = this.body.position.y + 32;
      this.snowballs.fireProjectile(projectileX, projectileY, closestEnemy);
    }
  }

  addUpgrade(upgrade: IcePortalUpgrades): void {
    this.upgrade();

    if (upgrade instanceof BiggerSnowballsUpgrade) {
      this.snowballs.enableBiggerSnowballs();
    }

    if (upgrade instanceof MassiveSnowballsUpgrade) {
      this.snowballs.enableMassiveSnowballs();
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
