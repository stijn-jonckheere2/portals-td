
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { BasePortal } from '../base/base.portal';
import { BaseUpgrade } from '../../upgrades/base/base.upgrade';
import { MindOrbGroup } from '../../projectiles/mind-orb/mind-orb.group';

export class RemoteControlOrb extends BasePortal {
  static PORTAL_ELEMENT = PortalElement.MIND;
  static PORTAL_RANGE: number = 2000;
  static override SPRITE_KEY = 'orbs';
  static override SPRITE_URL = 'assets/sprites/orbs.png';

  triggerTimer: Phaser.Time.TimerEvent;
  mindOrbs: MindOrbGroup;
  priorityTarget: BaseEnemy;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, RemoteControlOrb.SPRITE_KEY, RemoteControlOrb.PORTAL_ELEMENT);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(RemoteControlOrb.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 650;
    this.maxRange = RemoteControlOrb.PORTAL_RANGE;

    this.mindOrbs = new MindOrbGroup(this.baseScene, this);

    this.setScale(1.2);
    this.body.setSize(32, 32);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

    this.rotation += 0.075;
  }

  startShooting(): void {
    if (this.triggerTimer) {
      this.triggerTimer.remove();
    }

    this.triggerTimer = this.scene.time.addEvent({
      callback: () => this.shootPriorityTarget(),
      callbackScope: this,
      delay: this.firingSpeed, // 1000 = 1 second
      loop: true
    });
  }

  shootPriorityTarget(): void {
    const fireballX = this.getCenter().x;
    const fireballY = this.getCenter().y;
    const priorityTargetIsAlive = !this.priorityTarget?.isDead && this.priorityTarget?.body;

    if (priorityTargetIsAlive) {
      this.mindOrbs.fireProjectile(fireballX, fireballY, this.priorityTarget);
    }
  }

  addUpgrade(upgrade: BaseUpgrade): void {
    this.upgrade();
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
    this.triggerTimer?.destroy();
    this.destroy(true);
  }
}
