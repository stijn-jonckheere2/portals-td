import { tilesetsConfig } from "src/config/tilesets.config";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { BaseScene } from "./base.scene";
import { GrasslandScene } from "./grassland.scene";

export class PreloadScene extends BaseScene {

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: 'preload-scene'
    });
  }

  preload(): void {
  }

  create(): void {
    this.scene.start(GrasslandScene.KEY);
  }
}
