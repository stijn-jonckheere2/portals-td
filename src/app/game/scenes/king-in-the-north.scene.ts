import { tilesetsConfig } from 'src/config/tilesets.config';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { initExplosionAnim } from '../anims/explosion.anim';
import { BaseGameScene } from './base-game.scene';

export class KingInTheNorthScene extends BaseGameScene {
  static KEY: string = 'king-in-the-north-scene';
  static PLUGIN_KEY: string = 'animated-tiles-plugin';
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

    this.load.scenePlugin('AnimatedTiles', '../../../assets/plugins/AnimatedTiles.js', 'animatedTiles', KingInTheNorthScene.PLUGIN_KEY);
  }

  override create(): void {
    super.create();

    this.startingGold = 550;

    const pluginInstance = this[KingInTheNorthScene.PLUGIN_KEY];
    pluginInstance.init(this.map);

    this.createWaves();
    this.createAnims();
  }

  createAnims(): void {
    initExplosionAnim(this.anims);
  }

  createWaves(): void {
    this.levelGoldSubject$.next(550);
    this.wavesManager.setMaxWaves(100);
  }
}
