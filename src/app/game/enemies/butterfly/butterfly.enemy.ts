import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';

export class ButterflyEnemy extends BaseEnemy {
  static SPRITE_KEY = 'butterfly';
  static SPRITE_URL = 'assets/sprites/butterfly.png';
  static override MIN_WAVE: number = 0;
  static override MAX_WAVE: number = 0;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * 2;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ButterflyEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, ButterflyEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = ButterflyEnemy.HEALTH;
    this.gold = 4;
    this.baseSpeed = 200;
  }

  override update(time, delta): void {
    super.update(time, delta);
  }
}
