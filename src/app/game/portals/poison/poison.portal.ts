import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BasePortal } from '../base/base.portal';
import { BaseUpgrade } from '../../upgrades/base/base.upgrade';
import { AilmentType } from '../../ailments/ailment-type.enum';
import { PoisonedAilment } from '../../ailments/poisoned/poisoned.ailment';

export class PoisonPortal extends BasePortal {
  static PORTAL_NAME: string = 'Poison Portal';
  static PORTAL_DESCRIPTION: string = "Applies poison to nearby enemies dealing damage over time";
  static PORTAL_ELEMENT = PortalElement.POISON;
  static PORTAL_RANGE: number = 350;

  triggerTimer: Phaser.Time.TimerEvent;

  closestEnemy: BaseEnemy;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BasePortal.SPRITE_KEY, PoisonPortal.PORTAL_ELEMENT);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(PoisonPortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();
  }

  override init(): void {
    super.init();

    this.firingSpeed = 1500;
    this.maxRange = PoisonPortal.PORTAL_RANGE;
    this.price = PortalPrice.POISON;

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
      callback: this.poisonNearbyEnemies,
      callbackScope: this,
      delay: this.firingSpeed, // 1000 = 1 second
      loop: true
    });
  }

  poisonNearbyEnemies(): void {
    const unpoisonedEnemies = this.getUnpoisonedEnemies();

    if (!unpoisonedEnemies) {
      return;
    }

    const closeEnemies = unpoisonedEnemies.filter(enemy => {
      const distance = Phaser.Math.Distance.Between(
        enemy.body.center.x,
        enemy.body.center.y,
        this.body.center.x,
        this.body.center.y,
      );

      return distance < 200;
    })

    const enemiesByDistance = closeEnemies.sort((a: BaseEnemy, b: BaseEnemy) => {
      const distanceA = Phaser.Math.Distance.Between(
        a.body.center.x,
        a.body.center.y,
        this.body.center.x,
        this.body.center.y,
      );

      const distanceB = Phaser.Math.Distance.Between(
        a.body.center.x,
        a.body.center.y,
        this.body.center.x,
        this.body.center.y,
      );

      return distanceA > distanceB ? 0 : 1;
    });

    enemiesByDistance.some((enemy, i) => {
      if (i < 4) {
        this.poisonEnemy(enemy);
        return false;
      }
      return true;
    });
  }

  poisonEnemy(enemy: BaseEnemy): void {
    if (enemy.isDead) {
      return;
    }

    const { x, y } = enemy.body;
    const dotPositionX: number = x - 10;
    const dotPositionY: number = y - 10;
    let tickDamage: number, tickInterval: number;

    switch (this.upgradeLevel) {
      case 0:
        tickDamage = 5;
        tickInterval = 1000;
        break;
      case 1:
        tickDamage = 15;
        tickInterval = 850;
        break;
      case 2:
        tickDamage = 40;
        tickInterval = 600;
        break;
    }

    const poison = new PoisonedAilment(this.baseScene, dotPositionX, dotPositionY, tickDamage, tickInterval, enemy, this);
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
