import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseGameScene } from '../../scenes/base-game.scene';
import { BaseScene } from '../../scenes/base.scene';
import { BaseEnemy } from '../base/base.enemy';
import { ButterflyEnemy } from '../butterfly/butterfly.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class LarvaEnemy extends BaseEnemy {
  static SPRITE_KEY = 'larva';
  static SPRITE_URL = 'assets/sprites/larva.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[LarvaEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[LarvaEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[LarvaEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[LarvaEnemy.name].distanceToSibling;
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
    this.damage = 36;
    this.baseSpeed = EnemyDifficultySettings[LarvaEnemy.name].speed;
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  override update(time, delta): void {
    super.update(time, delta);
  }

  override destroyEnemy(receiveGold?: boolean): void {
    const gameScene = this.baseScene as BaseGameScene;
    const currentDestinationIndex: number = this.nextDestinationIndex - 1;

    const { x, y } = this;

    gameScene.spawnEnemy(ButterflyEnemy, x, y, 2, currentDestinationIndex)

    gameScene.time.addEvent({
      repeat: 9,
      delay: ButterflyEnemy.DISTANCE_TO_SIBLING,
      callback: () => gameScene.spawnEnemy(ButterflyEnemy, x, y, 2, currentDestinationIndex)
    });

    super.destroyEnemy(receiveGold);
  }
}
