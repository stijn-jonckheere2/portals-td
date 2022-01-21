import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class BabySlimeEnemy extends BaseEnemy {
  static SPRITE_KEY = 'baby-slime';
  static SPRITE_URL = 'assets/sprites/baby-slime.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[BabySlimeEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[BabySlimeEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[BabySlimeEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[BabySlimeEnemy.name].distanceToSibling;
  static override SCALE: number = 3;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BabySlimeEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, BabySlimeEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.currentHealth = BabySlimeEnemy.HEALTH;
    this.gold = 24;
    this.baseSpeed = EnemyDifficultySettings[BabySlimeEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
