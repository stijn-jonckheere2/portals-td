import { tilesetsConfig } from 'src/config/tilesets.config';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { BaseScene } from './base.scene';

export class GrasslandScene extends BaseScene {
  static KEY: string = 'grassland-scene';
  static MAP_KEY: string = 'grassland-map';

  waypoints = [
    {
      x: 120,
      y: 50
    },
    {
      x: 500,
      y: 50
    },
  ];

  constructor(config: SceneConfig) {
    super({
      ...config,
      key: GrasslandScene.KEY,
      tilesetConfig: tilesetsConfig.nature
    });
  }

  preload(): void {
    const { key, url } = this.tilesetConfig;

    this.load.tilemapTiledJSON(GrasslandScene.MAP_KEY, 'assets/maps/grassland.json');
    this.load.image(key, url);

    this.load.spritesheet('axolotl', 'assets/sprites/axolotl.png', {
      frameWidth: 16,
      frameHeight: 16
    });

  }

  create(): void {
    this.map = this.createMap();
    this.layers = this.createLayers();
    const axolotl = this.createAxolotl();

    this.physics.add.collider(axolotl, this.layers.path);
  }

  createMap(): Phaser.Tilemaps.Tilemap {
    const map = this.make.tilemap({
      key: GrasslandScene.MAP_KEY
    });

    return map;
  }

  createLayers(): any {
    const { id, key } = this.tilesetConfig;
    const natureTiles = this.map.addTilesetImage(id, key);

    const backgroundLayer = this.map.createLayer('background', natureTiles);
    const pathLayer = this.map.createLayer('path', natureTiles);
    pathLayer.setCollisionByExclusion([58], true);

    return {
      background: backgroundLayer,
      path: pathLayer,
    };
  }

  createAxolotl(): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    this.anims.create({
      key: 'walkStraight',
      frames: this.anims.generateFrameNumbers('axolotl', {
        frames: [0, 4, 8, 12]
      }),
      frameRate: 8,
      repeat: -1
    });

    const axolotl = this.physics.add.sprite(120, 50, 'axolotl')
      .setScale(2)
      .setOrigin(0.5);

    axolotl.body.setGravityY(300);
    axolotl.setCollideWorldBounds(true);
    axolotl.anims.play('walkStraight');

    return axolotl;
  }

  moveEnemy(enemy: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
    this.waypoints.forEach(waypoint => {

    });
  }
}
