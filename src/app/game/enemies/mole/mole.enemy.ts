import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class MoleEnemy extends BaseEnemy {
  static SPRITE_KEY = 'mole';
  static SPRITE_URL = 'assets/sprites/mole.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[MoleEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[MoleEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[MoleEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[MoleEnemy.name].distanceToSibling;
  static override SCALE: number = 2.5;
  
  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, MoleEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, MoleEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = MoleEnemy.HEALTH;
    this.gold = 8;
    this.baseSpeed = EnemyDifficultySettings[MoleEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
