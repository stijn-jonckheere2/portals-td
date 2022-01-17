import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseUnit } from '../../enemies/base/base.unit';
import { SnowballGroup } from '../../projectiles/snowball/snowball.group';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';

export class IcePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_URL = 'assets/sprites/portals.png';
  static PORTAL_ELEMENT = PortalElement.ICE;

  triggerTimer: Phaser.Time.TimerEvent;
  snowballs: SnowballGroup;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, IcePortal.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(IcePortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 700;
    this.maxRange = 200;

    this.snowballs = new SnowballGroup(this.baseScene);
    this.body.setSize(40, 40);
    this.price = PortalPrice.ICE;

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
    const closest = this.scene.physics.closest(this, this.baseScene.enemies);

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
