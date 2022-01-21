import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class BambooEnemy extends BaseEnemy {
  static SPRITE_KEY = 'bamboo';
  static SPRITE_URL = 'assets/sprites/bamboo.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[BambooEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[BambooEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[BambooEnemy.name].healthEquivalent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BambooEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, BambooEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = BambooEnemy.HEALTH;
    this.gold = 6;
    this.baseSpeed = EnemyDifficultySettings[BambooEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
