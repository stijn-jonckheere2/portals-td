import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class OwlEnemy extends BaseEnemy {
  static SPRITE_KEY = 'owl';
  static SPRITE_URL = 'assets/sprites/owl.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[OwlEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[OwlEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[OwlEnemy.name].healthEquivalent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, OwlEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, OwlEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = OwlEnemy.HEALTH;
    this.gold = 4;
    this.baseSpeed = EnemyDifficultySettings[OwlEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
