import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class OctopusEnemy extends BaseEnemy {
  static SPRITE_KEY = 'octopus';
  static SPRITE_URL = 'assets/sprites/octopus.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[OctopusEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[OctopusEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[OctopusEnemy.name].healthEquivalent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, OctopusEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, OctopusEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = OctopusEnemy.HEALTH;
    this.gold = 8;
    this.baseSpeed = EnemyDifficultySettings[OctopusEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
