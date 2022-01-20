import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseGameScene } from '../../scenes/base-game.scene';
import { BaseScene } from '../../scenes/base.scene';
import { GrasslandScene } from '../../scenes/grassland.scene';
import { BaseEnemy } from '../base/base.enemy';
import { times } from 'lodash';
import { ButterflyEnemy } from '../butterfly/butterfly.enemy';

export class LarvaEnemy extends BaseEnemy {
  static SPRITE_KEY = 'larva';
  static SPRITE_URL = 'assets/sprites/larva.png';
  static override MIN_WAVE: number = 15;
  static override MAX_WAVE: number = 100;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * 15;
  static override DISTANCE_TO_SIBLING: number = 5000;
  static override SCALE: number = 4;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, LarvaEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, LarvaEnemy.SPRITE_KEY);
  }

  override init(): void {
    super.init();

    this.currentHealth = LarvaEnemy.HEALTH;
    this.gold = 12;
    this.baseSpeed = 75;
    this.damage = 36;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  override destroyEnemy(receiveGold?: boolean): void {
    const gameScene = this.baseScene as BaseGameScene;
    const nextDestinationIndex = this.nextDestinationIndex - 1;
    const { x, y } = this;

    for (let i = 0; i < 5; i++) {
      gameScene.spawnEnemy(ButterflyEnemy, x, y, 2, nextDestinationIndex)

      gameScene.time.addEvent({
        repeat: 5,
        delay: 200,
        callback: () => gameScene.spawnEnemy(ButterflyEnemy, x, y, 2, nextDestinationIndex)
      });
    }

    super.destroyEnemy(receiveGold);
  }
}
