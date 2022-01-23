import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BasePortal } from '../base/base.portal';
import { HolyOrbGroup } from '../../projectiles/holy-orb/holy-orb.group';
import { HolyPortalUpgrades } from '../../upgrades/holy/holy-portal-upgrades.type';
import { WallSweepUpgrade } from '../../upgrades/holy/wall-sweep/wall-sweep.upgrade';
import { TwinBladesUpgrade } from '../../upgrades/holy/twin-blades/twin-blades.upgrade';

export class HolyPortal extends BasePortal {
  static PORTAL_NAME: string = 'Holy Portal';
  static PORTAL_DESCRIPTION: string = "Uses holy orbs that orbit around itself";

  static PORTAL_ELEMENT = PortalElement.HOLY;
  static PORTAL_RANGE: number = 200;

  triggerTimer: Phaser.Time.TimerEvent;

  holyOrbs: HolyOrbGroup;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BasePortal.SPRITE_KEY, PortalElement.HOLY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(HolyPortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.price = PortalPrice.HOLY;
    this.body.setSize(40, 40);
    this.maxRange = HolyPortal.PORTAL_RANGE;

    this.startShooting();
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

  }

  startShooting(): void {
    if (this.holyOrbs) {
      return;
    }
    this.holyOrbs = new HolyOrbGroup(this.baseScene);

    const center = this.getCenter();

    this.holyOrbs.centerPoint = {
      x: center.x,
      y: center.y
    };

    this.holyOrbs.fireProjectile(0, 0, null, 0.045, 120);
  }

  addUpgrade(upgrade: HolyPortalUpgrades): void {
    this.upgrade();

    if (upgrade instanceof WallSweepUpgrade) {
      this.holyOrbs.resetProjectiles();
      this.holyOrbs.setUpgradedDamage(10);

      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 90);
      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 150);

      this.maxRange = 250;
      this.toggleRadiusVisible(true);
      return;
    }

    if (upgrade instanceof TwinBladesUpgrade) {
      this.holyOrbs.resetProjectiles();
      this.holyOrbs.setUpgradedDamage(20);

      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 90);
      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 150);
      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 210);

      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 90, true);
      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 150, true);
      this.holyOrbs.fireProjectile(0, 0, null, 0.06, 210, true);

      this.maxRange = 330;
      this.toggleRadiusVisible(true);
      return;
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
    this.holyOrbs?.destroy(true);
    this.triggerTimer?.destroy();
    this.destroy(true);
  }
}
