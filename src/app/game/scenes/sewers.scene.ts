import { tilesetsConfig } from 'src/config/tilesets.config';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { initExplosionAnim } from '../anims/explosion.anim';
import { BaseGameScene } from './base-game.scene';

export class SewersScene extends BaseGameScene {
  static KEY: string = 'sewers-scene';
  static PLUGIN_KEY: string = 'animated-tiles-plugin';
  static NAME: string = 'Sewers';
  static THUMBNAIL: string = 'assets/images/thumbnails/sewers.png';
  static LEVEL: number = 3;

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: SewersScene.KEY,
      tilesetConfig: tilesetsConfig.sewers,
    });
  }

  override preload(): void {
    super.preload();

    this.load.scenePlugin('AnimatedTiles', '../../../assets/plugins/AnimatedTiles.js', 'animatedTiles', SewersScene.PLUGIN_KEY);
  }

  override create(): void {
    super.create();

    const pluginInstance = this[SewersScene.PLUGIN_KEY];
    pluginInstance.init(this.map);

    this.startingGold = 550;

    this.createWaves();
    this.createAnims();
  }

  createAnims(): void {
    initExplosionAnim(this.anims);
  }

  createWaves(): void {
    this.levelGoldSubject$.next(this.startingGold);
    this.wavesManager.setMaxWaves(100);
  }
}
