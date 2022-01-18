import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';

export class ReptileEnemy extends BaseEnemy {
  static SPRITE_KEY = 'reptile';
  static SPRITE_URL = 'assets/sprites/reptile.png';
  static override MIN_WAVE: number = 20;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, ReptileEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, ReptileEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.gold = 12;
    this.baseSpeed = 150;
    this.health = 400;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
