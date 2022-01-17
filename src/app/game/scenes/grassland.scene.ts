import { tilesetsConfig } from 'src/config/tilesets.config';
import { AxolotlEnemy } from '../enemies/axolotl/axolotl.enemy';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { initExplosionAnim } from '../anims/explosion.anim';
import { BaseGameScene } from './base-game.scene';

export class GrasslandScene extends BaseGameScene {
  static KEY: string = 'grassland-scene';

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: GrasslandScene.KEY,
      tilesetConfig: tilesetsConfig.grassland
    });
  }

  override preload(): void {
    super.preload();
  }

  override create(): void {
    super.create();
    this.createAnims();

    setInterval(() => {
      const axol = this.createAxolotl();
      axol.addCollider(this.getCollidingProjectiles(), this.onUnitHit)
      axol.move();

      this.enemies.push(axol);
    }, 750);
  }

  createAnims(): void {
    initExplosionAnim(this.anims);
  }

  createAxolotl(): AxolotlEnemy {
    const axolotl = new AxolotlEnemy(this, this.spawnPoint.x, this.spawnPoint.y)
      .setScale(2)
      .setOrigin(0.5);

    return axolotl;
  }

}
