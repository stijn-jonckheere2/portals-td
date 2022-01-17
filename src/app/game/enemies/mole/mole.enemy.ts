import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';

export class MoleEnemy extends BaseEnemy {
  static SPRITE_KEY = 'mole';
  static SPRITE_URL = 'assets/sprites/mole.png';

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, MoleEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, MoleEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.gold = 37;
    this.speed = 100;
    this.health = 200;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }
}
