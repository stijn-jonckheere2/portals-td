import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class FlameEnemy extends BaseEnemy {
  static SPRITE_KEY = 'flame';
  static SPRITE_URL = 'assets/sprites/flame.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[FlameEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[FlameEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[FlameEnemy.name].healthEquivalent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, FlameEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, FlameEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = FlameEnemy.HEALTH;
    this.gold = 30;
    this.damage = 10;
    this.baseSpeed = EnemyDifficultySettings[FlameEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
