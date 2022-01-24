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
  orbContainer: Phaser.GameObjects.Container;

  line: Phaser.GameObjects.Line;
  orbRotation: number = 0.05;

  get realtimeRotation(): number {
    const worldTimeScale: number = this.baseScene.physics.world.timeScale;

    if (worldTimeScale === 0.5) {
      return this.orbRotation * 2;
    }

    return this.orbRotation;
  }

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

    if (this.orbContainer) {
      this.orbContainer.rotation += this.realtimeRotation;
    }
  }

  startShooting(): void {
    if (this.holyOrbs) {
      return;
    }

    const portalCenter = this.getCenter();

    this.orbContainer = this.baseScene.add.container(portalCenter.x, portalCenter.y);
    this.line = this.baseScene.add.line(0, 0, 0, 0, 120, 120, 0xff0000);
    this.line.setAlpha(0);
    this.orbContainer.add(this.line);

    this.holyOrbs = new HolyOrbGroup(this.baseScene);
    this.addFirstOrb();
  }

  addOrb(x, y): void {
    const orb = this.holyOrbs.fireProjectile(0, 0);
    orb.x = x;
    orb.y = y;
    this.orbContainer.add(orb);
  }

  addFirstOrb(): void {
    const { x, y } = this.line.getBottomRight();
    this.addOrb(x, y);
  }

  addWallSweepOrbs(): void {
    const { x, y } = this.line.getBottomRight();
    this.addOrb(x - 10, y - 10);
    this.addOrb(x + 20, y + 20);
  }

  addTwinBladeOrbs(): void {
    const { x: bottomX, y: bottomY } = this.line.getBottomRight();

    this.addOrb(bottomX - 10, bottomY - 10);
    this.addOrb(bottomX + 10, bottomY + 10);
    this.addOrb(bottomX + 30, bottomY + 30);

    const { x: topX, y: topY } = this.line.getTopLeft();

    this.addOrb(topX + 10, topY + 10);
    this.addOrb(topX - 10, topY - 10);
    this.addOrb(topX - 30, topY - 30);
  }

  addUpgrade(upgrade: HolyPortalUpgrades): void {
    this.upgrade();

    if (upgrade instanceof WallSweepUpgrade) {
      this.holyOrbs.resetProjectiles();
      this.holyOrbs.setUpgradedDamage(40);

      this.addWallSweepOrbs();
      this.maxRange = 250;
      this.orbRotation = 0.06;
      this.toggleRadiusVisible(true);
      return;
    }

    if (upgrade instanceof TwinBladesUpgrade) {
      this.holyOrbs.resetProjectiles();
      this.holyOrbs.setUpgradedDamage(70);

      this.addTwinBladeOrbs();
      this.maxRange = 350;
      this.orbRotation = 0.07;
      this.toggleRadiusVisible(true);
      return;
    }
  }

  initEvents(): void {
    this.scene?.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene?.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  override destroyEnemy(): void {
    super.destroyEnemy();
    this.stopEvents();
    this.holyOrbs?.resetProjectiles();
    this.orbContainer?.destroy(true);
    this.triggerTimer?.destroy();
    this.destroy(true);
  }
}
