import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class BeastEnemy extends BaseEnemy {
  static SPRITE_KEY = 'beast';
  static SPRITE_URL = 'assets/sprites/beast.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[BeastEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[BeastEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[BeastEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[BeastEnemy.name].distanceToSibling;
  static override SCALE: number = 2.5;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, BeastEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, BeastEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.currentHealth = BeastEnemy.HEALTH;
    this.gold = 11;
    this.baseSpeed = EnemyDifficultySettings[BeastEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
