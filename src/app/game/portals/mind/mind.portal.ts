import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BaseScene } from '../../scenes/base.scene';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BasePortal } from '../base/base.portal';
import { BaseUpgrade } from '../../upgrades/base/base.upgrade';
import { RemoteControlOrb } from './remote-control-orb.portal';
import { orderBy } from 'lodash';
import { MastermindUpgrade } from '../../upgrades/mind/mastermind/mastermind.upgrade';
import { TrinityUpgrade } from '../../upgrades/mind/trinity/trinity.upgrade';

export class MindPortal extends BasePortal {
  static PORTAL_NAME: string = 'Mind Portal';
  static PORTAL_DESCRIPTION: string = "Mind controls its own orb to track the targets on the path";
  static PORTAL_ELEMENT = PortalElement.MIND;
  static PORTAL_RANGE: number = 10000;

  remoteOrbs: RemoteControlOrb[] = [];
  priorityTarget: BaseEnemy;

  get activeRemoteOrbs(): RemoteControlOrb[] {
    return this.remoteOrbs;
  }

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BasePortal.SPRITE_KEY, MindPortal.PORTAL_ELEMENT);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setFrame(MindPortal.PORTAL_ELEMENT);
    this.init();
    this.initEvents();

    this.remoteOrbs.push(new RemoteControlOrb(this.baseScene, x, y));
  }

  override init(): void {
    super.init();

    this.price = PortalPrice.MIND;

    this.body.setSize(40, 40);
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

  }

  override update(time, delta): void {
    super.update(time, delta);

    this.findPriorityTarget();
  }

  findPriorityTarget(): void {
    const aliveEnemies = this.getAliveEnemies();

    if (!aliveEnemies?.length) {
      this.returnRemoteOrbs();
      return;
    }

    const furthestAheadEnemy: BaseEnemy = orderBy(aliveEnemies, ['travelDistance'], ['desc'])[0];
    this.setRemoteOrbTarget(furthestAheadEnemy);
    this.calculateRemoteOrbDistanceToTarget(furthestAheadEnemy);
  }

  override toggleRadiusVisible(flag: boolean): void {
    return;
  }

  startShooting(): void {
    this.remoteOrbs.forEach(orb => orb.startShooting());
  }

  setRemoteOrbTarget(target: BaseEnemy): void {
    this.remoteOrbs.forEach(orb => orb.priorityTarget = target);
  }

  returnRemoteOrbs(): void {
    this.remoteOrbs.forEach(orb => {
      const { x, y } = this.body.center;

      const distanceToHome = Phaser.Math.Distance.Between(
        x,
        y,
        orb.getCenter().x,
        orb.getCenter().y,
      );

      if (distanceToHome > 100) {
        this.baseScene.physics.moveTo(orb, x, y, 700);
      } else {
        orb.setVelocity(0);
      }
    });
  }

  calculateRemoteOrbDistanceToTarget(target: BaseEnemy): void {
    this.remoteOrbs.forEach(orb => {
      const aheadEnemyCenter = target.getCenter();
      const remoteOrbCenter = orb.getCenter();

      const distanceToPriorityTarget = Phaser.Math.Distance.Between(
        aheadEnemyCenter.x,
        aheadEnemyCenter.y,
        remoteOrbCenter.x,
        remoteOrbCenter.y,
      );

      if (distanceToPriorityTarget < 250) {
        // Chase target of target
        const targetOfTarget = target.currentDestination;

        const distanceToTargetOfTarget = Phaser.Math.Distance.Between(
          targetOfTarget.x,
          targetOfTarget.y,
          remoteOrbCenter.x,
          remoteOrbCenter.y,
        );

        // Dont move at all if you are on target and close to their target as well
        if (distanceToTargetOfTarget < 250) {
          return;
        }

        const targetX = targetOfTarget.x + this.getRandomNumber(35, 85);
        const targetY = targetOfTarget.y + this.getRandomNumber(35, 85);
        this.baseScene.physics.moveTo(orb, targetX, targetY, target.actualSpeed);
        return;
      }

      // Chase target
      const targetX = aheadEnemyCenter.x + this.getRandomNumber(35, 85);
      const targetY = aheadEnemyCenter.y + this.getRandomNumber(35, 85);
      this.baseScene.physics.moveTo(orb, targetX, targetY, 700);
    });
  }

  upgradeRemoteOrbs(): void {
    this.remoteOrbs.forEach(orb => orb.upgrade());
  }

  addUpgrade(upgrade: BaseUpgrade): void {
    this.upgrade();

    this.remoteOrbs.push(new RemoteControlOrb(this.baseScene, this.x, this.y))
    this.baseGameScene.updateEnemyColliders();

    if (upgrade instanceof MastermindUpgrade) {
      this.remoteOrbs.forEach(orb => orb.firingSpeed *= 0.8);
    }

    if (upgrade instanceof TrinityUpgrade) {
      this.remoteOrbs.forEach(orb => orb.firingSpeed *= 0.6);
    }

    this.startShooting();
  }

  initEvents(): void {
    this.scene?.events.on(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  stopEvents(): void {
    this.scene?.events.off(Phaser.Scenes.Events.PRE_UPDATE, this.preUpdate, this);
    this.scene?.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  override destroyEnemy(): void {
    super.destroyEnemy();

    this.remoteOrbs.forEach(orb => orb.destroyEnemy());

    this.stopEvents();
    this.destroy(true);
  }
}
