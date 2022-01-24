import { Subscription } from 'rxjs';
import { EffectManager } from '../../effects/manager/effect.manager';
import { BaseEnemy } from '../../enemies/base/base.enemy';
import { BasePortal } from '../../portals/base/base.portal';
import { BaseScene } from '../../scenes/base.scene';

export abstract class BaseProjectile extends Phaser.Physics.Arcade.Sprite {
  damage: number = 10;
  speed: number = 100;

  maxDistance: number = 200;
  traveledDistanceX: number = 0;
  traveledDistanceY: number = 0;

  effectManager: EffectManager;
  trackingSub$ = new Subscription();

  parent: BasePortal;
  effectKey: string;
  effectSpriteKey: string;

  get isMaxRange(): boolean {
    return this.traveledDistanceX > this.maxDistance || this.traveledDistanceY > this.maxDistance;
  }

  get baseScene(): BaseScene {
    return this.scene as BaseScene;
  }

  get bodyDynamic(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string, effectKey: string, effectSpriteKey: string) {
    super(scene, x, y, spriteKey);

    this.effectKey = effectKey;
    this.effectSpriteKey = effectSpriteKey;

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  init(): void {
    this.setImmovable(true);
    this.effectManager = new EffectManager(this.baseScene);
  }

  setParent(portal: BasePortal): void {
    this.parent = portal;
  }

  alertParentOfKill(): void {
    this.parent?.addKill();
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);

    if (this.body && this.active) {
      this.traveledDistanceX += this.body.deltaAbsX();
      this.traveledDistanceY += this.body.deltaAbsY();
    }

    if (this.isMaxRange) {
      this.destroyEnemy();
    }
  }

  damageEnemy(enemy: BaseEnemy, damage: number): void {
    if (enemy.isDead) {
      return;
    }

    enemy.takeDamage(damage);

    if (enemy.isDead) {
      this.alertParentOfKill();
    }

    this.effectManager.playEffectOn(this.effectSpriteKey, this.effectKey, enemy);
  }

  trackTarget(target: BaseEnemy): void {
    this.trackingSub$ = target.onUpdate.asObservable().subscribe(newTarget => {
      if (newTarget && newTarget.body) {
        this.fire(newTarget.body.center.x, newTarget.body.center.y);
      }
    });
  }

  destroyEnemy(): void {
    this.trackingSub$.unsubscribe();
    this.setActive(false);
    this.setVisible(false);
    this.body.reset(0, 0);
    this.traveledDistanceX = 0;
    this.traveledDistanceY = 0;
  }

  abstract fire(x: number, y: number): void;
  abstract onHitTarget(target: BaseEnemy): void;
}
