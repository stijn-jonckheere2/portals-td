import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BasePortal } from '../base/base.portal';
import { BaseUpgrade } from '../../upgrades/base/base.upgrade';
import { AilmentType } from '../../ailments/ailment-type.enum';

export class PoisonPortal extends BasePortal {
  static PORTAL_ELEMENT = PortalElement.POISON;

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

    this.firingSpeed = 2500;
    this.maxRange = 350;
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
    const aliveEnemies = this.getAliveEnemies();

    if (!aliveEnemies) {
      return;
    }

    const closeEnemies = aliveEnemies.filter(enemy => {
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
    switch (this.upgradeLevel) {
      case 0:
        enemy.setAilment(AilmentType.POISONED, 5000, 5, 1000);
        break;
      case 1:
        enemy.setAilment(AilmentType.POISONED, 5000, 15, 850);
        break;
      case 2:
        enemy.setAilment(AilmentType.POISONED, 5000, 40, 600);
        break;
    }
  }

  addUpgrade(upgrade: BaseUpgrade): void {
    this.upgrade();
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
