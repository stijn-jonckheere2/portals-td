import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class SkullEnemy extends BaseEnemy {
  static SPRITE_KEY = 'skull';
  static SPRITE_URL = 'assets/sprites/skull.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[SkullEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[SkullEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[SkullEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[SkullEnemy.name].distanceToSibling;
  static override SCALE: number = 3;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, SkullEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, SkullEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.currentHealth = SkullEnemy.HEALTH;
    this.gold = 24;
    this.damage = 10;
    this.baseSpeed = EnemyDifficultySettings[SkullEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
