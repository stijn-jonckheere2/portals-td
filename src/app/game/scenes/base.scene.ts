import * as Phaser from 'phaser';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { BaseEnemy } from '../enemies/base/base.enemy';
import { SceneConfig } from '../interfaces/scene-config.interface';
import { TilesetConfig } from '../interfaces/tileset-config.interface';

export abstract class BaseScene extends Phaser.Scene {
  private startingGold: number = 400;
  private startingHealth: number = 100;

  tilesetConfig: TilesetConfig;
  map: Phaser.Tilemaps.Tilemap;
  layers: { [key: string]: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.ObjectLayer };

  spawnPoint: Phaser.Types.Tilemaps.TiledObject;
  endPoint: Phaser.Types.Tilemaps.TiledObject;
  waypoints: Phaser.Types.Tilemaps.TiledObject[];
  towerpoints: Phaser.Types.Tilemaps.TiledObject[];

  levelGoldSubject$: BehaviorSubject<number>;
  levelHealthSubject$: BehaviorSubject<number>;

  enemies: BaseEnemy[] = [];

  constructor(config: SceneConfig) {
    super(config);
    this.tilesetConfig = config.tilesetConfig || this.tilesetConfig;
  }

  preload(): void {
  }

  create(): void {
    this.setupWindowSubjects();
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

  private setupWindowSubjects(): void {
    this.levelGoldSubject$ = (window as any).portalsTD.levelGoldSubject$;
    this.levelGoldSubject$.next(this.startingGold);

    this.levelHealthSubject$ = (window as any).portalsTD.levelHealthSubject$;
    this.levelHealthSubject$.next(this.startingHealth);
  }
}
