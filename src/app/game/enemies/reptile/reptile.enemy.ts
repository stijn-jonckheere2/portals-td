import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class ReptileEnemy extends BaseEnemy {
  static SPRITE_KEY = 'reptile';
  static SPRITE_URL = 'assets/sprites/reptile.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[ReptileEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[ReptileEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[ReptileEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[ReptileEnemy.name].distanceToSibling;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ReptileEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, ReptileEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.currentHealth = ReptileEnemy.HEALTH;
    this.gold = 12;
    this.baseSpeed = EnemyDifficultySettings[ReptileEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
