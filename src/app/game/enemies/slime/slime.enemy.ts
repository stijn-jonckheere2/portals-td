import { initEnemyAnim } from '../../anims/enemy.anim';
import { BaseGameScene } from '../../scenes/base-game.scene';
import { BaseScene } from '../../scenes/base.scene';
import { BabySlimeEnemy } from '../baby-slime/baby-slime.enemy';
import { BaseEnemy } from '../base/base.enemy';
import { EnemyDifficultySettings } from '../enemy.difficulty';

export class SlimeEnemy extends BaseEnemy {
  static SPRITE_KEY = 'slime';
  static SPRITE_URL = 'assets/sprites/slime.png';
  static override MIN_WAVE: number = EnemyDifficultySettings[SlimeEnemy.name].minWave;
  static override MAX_WAVE: number = EnemyDifficultySettings[SlimeEnemy.name].maxWave;
  static override HEALTH: number = BaseEnemy.BASE_HEALTH * EnemyDifficultySettings[SlimeEnemy.name].healthEquivalent;
  static override DISTANCE_TO_SIBLING: number = EnemyDifficultySettings[SlimeEnemy.name].distanceToSibling;
  static override SCALE: number = 3;

  babyTimer: Phaser.Time.TimerEvent;

  constructor(scene: BaseScene, x: number, y: number) {
    super(scene, x, y, SlimeEnemy.SPRITE_KEY);
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();
    initEnemyAnim(this.anims, SlimeEnemy.SPRITE_KEY, 4);
  }

  override init(): void {
    super.init();

    this.currentHealth = SlimeEnemy.HEALTH;
    this.gold = 24;
    this.baseSpeed = EnemyDifficultySettings[SlimeEnemy.name].speed;

    this.babyTimer = this.baseScene.time.addEvent({
      delay: BabySlimeEnemy.DISTANCE_TO_SIBLING,
      callback: () => this.spawnBabySlime()
    });
  }

  override preUpdate(time, delta): void {
    super.preUpdate(time, delta);
  }

  spawnBabySlime(): void {
    const gameScene = this.baseScene as BaseGameScene;
    const currentDestinationIndex: number = this.nextDestinationIndex - 1;

    const { x, y } = this;
    gameScene.spawnEnemy(BabySlimeEnemy, x, y, 2, currentDestinationIndex)
  }

  override destroyEnemy(receiveGold?: boolean): void {
    this.babyTimer.remove();
    super.destroyEnemy(receiveGold);
  }
}
