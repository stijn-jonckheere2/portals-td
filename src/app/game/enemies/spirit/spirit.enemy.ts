import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class SpiritEnemy extends BaseEnemy {
  static SPRITE_KEY = 'spirit';
  static SPRITE_URL = 'assets/sprites/spirit.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[SpiritEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[SpiritEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[SpiritEnemy.name].healthEquivalent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, SpiritEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, SpiritEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = SpiritEnemy.HEALTH;
    this.gold = 4;
    this.baseSpeed = EnemyDifficultySettings[SpiritEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
