import { tilesetsConfig } from 'src/config/tilesets.config';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { initExplosionAnim } from '../anims/explosion.anim';
import { BaseGameScene } from './base-game.scene';

export class KingInTheNorthScene extends BaseGameScene {
  static KEY: string = 'king-in-the-north-scene';
  static NAME: string = 'King in the north';
  static THUMBNAIL: string = 'assets/images/thumbnails/king-in-the-north.png';
  static LEVEL: number = 2;

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: KingInTheNorthScene.KEY,
      tilesetConfig: tilesetsConfig.kingInTheNorth,
    });
  }

  override preload(): void {
    super.preload();
  }

  override create(): void {
    super.create();

    this.createWaves();
    this.createAnims();
  }

  createAnims(): void {
    initExplosionAnim(this.anims);
  }

  createWaves(): void {
    this.levelGoldSubject$.next(550);
    this.wavesManager.setMaxWaves(100);
    this.startNextWave(1);
  }
}
