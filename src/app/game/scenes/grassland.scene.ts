import { tilesetsConfig } from 'src/config/tilesets.config';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { initExplosionAnim } from '../anims/explosion.anim';
import { BaseGameScene } from './base-game.scene';

export class GrasslandScene extends BaseGameScene {
  static KEY: string = 'grassland-scene';
  static NAME: string = 'Grasslands';
  static THUMBNAIL: string = 'assets/images/thumbnails/grasslands.png';
  static LEVEL: number = 1;

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: GrasslandScene.KEY,
      tilesetConfig: tilesetsConfig.grassland,
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
    this.wavesManager.setMaxWaves(1000);
    this.startNextWave(1);
  }
}
