import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class DragonEnemy extends BaseEnemy {
  static SPRITE_KEY = 'dragon';
  static SPRITE_URL = 'assets/sprites/dragon.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[DragonEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[DragonEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[DragonEnemy.name].healthEquivalent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, DragonEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, DragonEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = DragonEnemy.HEALTH;
    this.gold = 16;
    this.baseSpeed = EnemyDifficultySettings[DragonEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
