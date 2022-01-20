import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';

export class AxolotlEnemy extends BaseEnemy {
  static SPRITE_KEY = 'axolotl';
  static SPRITE_URL = 'assets/sprites/axolotl.png';
  static override MIN_WAVE: number = 1;
  static override MAX_WAVE: number = 40;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * 1;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, AxolotlEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, AxolotlEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = AxolotlEnemy.HEALTH;
    this.gold = 4;
    this.baseSpeed = 150;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
