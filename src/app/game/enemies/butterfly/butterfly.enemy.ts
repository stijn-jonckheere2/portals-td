import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class ButterflyEnemy extends BaseEnemy {
  static SPRITE_KEY = 'butterfly';
  static SPRITE_URL = 'assets/sprites/butterfly.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[ButterflyEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[ButterflyEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[ButterflyEnemy.name].healthEquivalent;

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
    this.baseSpeed = EnemyDifficultySettings[ButterflyEnemy.name].speed;
  }

  override update(time, delta): void {
    super.update(time, delta);
  }
}
