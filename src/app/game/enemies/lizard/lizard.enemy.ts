import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class LizardEnemy extends BaseEnemy {
  static SPRITE_KEY = 'lizard';
  static SPRITE_URL = 'assets/sprites/lizard.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[LizardEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[LizardEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[LizardEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[LizardEnemy.name].distanceToSibling;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, LizardEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, LizardEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.currentHealth = LizardEnemy.HEALTH;
    this.gold = 15;
    this.baseSpeed = EnemyDifficultySettings[LizardEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
