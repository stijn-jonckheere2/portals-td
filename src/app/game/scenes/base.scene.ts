import * as Phaser from 'phaser';
import { BehaviorSubject } from 'rxjs';
import { BaseEnemy } from '../enemies/base/base.enemy';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { TilesetConfig } from '../interfaces/tileset-config.interface';
import { WavesManager } from '../waves/waves.manager';
import AnimatedTiles from '../../../assets/plugins/AnimatedTiles.js';

export abstract class BaseScene extends Phaser.Scene {
  startingGold: number = 400;
  startingHealth: number = 100;

  tilesetConfig: TilesetConfig;
  map: Phaser.Tilemaps.Tilemap;
  layers: { [key: string]: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.ObjectLayer };
  pathLayer: Phaser.Tilemaps.TilemapLayer;

  spawnPoint: Phaser.Types.Tilemaps.TiledObject;
  endPoint: Phaser.Types.Tilemaps.TiledObject;
  waypoints: Phaser.Types.Tilemaps.TiledObject[];
  towerpoints: Phaser.Types.Tilemaps.TiledObject[];

  levelGoldSubject$: BehaviorSubject<number>;
  levelHealthSubject$: BehaviorSubject<number>;
  levelFastForwardSubject$: BehaviorSubject<number>;

  enemies: BaseEnemy[] = [];
  wavesManager: WavesManager = new WavesManager(0);

  constructor(config: SceneConfig) {
    super(config);
    this.tilesetConfig = config.tilesetConfig || this.tilesetConfig;
  }

  create(): void {
    this.setupWindowSubjects();
    this.wavesManager.init();
    this.physics.world.setFPS(60);
  }

  earnGold(gold: number): void {
    const totalGold = this.levelGoldSubject$.value + gold;
    this.levelGoldSubject$.next(totalGold);
  }

  spendGold(gold: number): void {
    const totalGold = this.levelGoldSubject$.value - gold;
    this.levelGoldSubject$.next(totalGold);
  }

  takeDamage(damage: number): void {
    const totalHealth = this.levelHealthSubject$.value - damage;
    this.levelHealthSubject$.next(totalHealth);
  }

  restartGame(): void {
    this.levelHealthSubject$.next(this.startingHealth);
    this.levelGoldSubject$.next(this.startingGold);
  }

  private setupWindowSubjects(): void {
    this.levelGoldSubject$ = (window as any).portalsTD.levelGoldSubject$;
    this.levelGoldSubject$.next(this.startingGold);

    this.levelHealthSubject$ = (window as any).portalsTD.levelHealthSubject$;
    this.levelHealthSubject$.next(this.startingHealth);

    this.levelFastForwardSubject$ = (window as any).portalsTD.levelFastForwardSubject$;
  }
}
