import { BehaviorSubject } from 'rxjs';
import { AxolotlEnemy } from '../enemies/axolotl/axolotl.enemy';
import { BaseEnemy } from '../enemies/base/base.enemy';
import { MoleEnemy } from '../enemies/mole/mole.enemy';
import { ReptileEnemy } from '../enemies/reptile/reptile.enemy';
import { waveData } from './data/wave.data';

export class WavesManager {
  private DIFF_MOD: number = 1.16;

  private currentDifficulty: number = 1;
  private enemies: any;

  private increaseDifficulty(): void {
    this.currentDifficulty = +(this.currentDifficulty * this.DIFF_MOD).toFixed(2);
  }

  currentWave: number = 1;
  maxWaves: number;

  currentWaveSubject$: BehaviorSubject<number>;
  lastWaveSubject$: BehaviorSubject<number>;

  get spawnRate(): number {
    return this.calculateSpawnRateForCurrentWave(this.currentWave);
  }

  get goldReward(): number {
    return this.calculateGoldForCurrentWave(this.currentWave);
  }

  private enemyPool: any[] = [
    AxolotlEnemy,
    MoleEnemy,
    ReptileEnemy,
  ];

  constructor(maxWaves: number, currentWave = 1) {
    this.maxWaves = maxWaves;
    this.currentWave = currentWave;
  }

  init(): void {
    this.setupWindowSubjects();
  }

  private getCurrentEnemyPool(): any[] {
    return this.enemyPool.filter((enemyClass: any) => enemyClass.MIN_WAVE <= this.currentWave);
  }

  getEnemies(): (typeof BaseEnemy)[] {
    console.log(`%cWave  --- ${this.currentWave}`, "color: cyan; padding: 4px 12px;");
    console.log(`%cDiff  --- ${this.currentDifficulty}`, "color: orange; padding: 4px 12px;");
    console.log(`%cGold  --- ${this.goldReward}`, "color: yellow; padding: 4px 12px;");
    console.log(`%cSpawn --- ${this.spawnRate}`, "color: pink; padding: 4px 12px;");

    return this.enemies[this.currentWave];
  }

  startNextWave(requestedWave?: number): void {
    if (requestedWave) {
      for (let i = 0; i < requestedWave; i++) {
        this.increaseDifficulty();
      }

      this.currentWave = requestedWave;
      this.currentWaveSubject$.next(this.currentWave);
      return;
    }

    if (this.currentWave < this.maxWaves) {
      this.increaseDifficulty();

      this.currentWave++;
      this.currentWaveSubject$.next(this.currentWave);
    }
  }

  setMaxWaves(max: number): void {
    this.maxWaves = max;
    this.lastWaveSubject$.next(this.maxWaves);
    this.enemies = waveData(this.maxWaves);
  }

  resetWaves(): void {
    this.currentWave = 1;
    this.currentWaveSubject$.next(this.currentWave);
  }

  private calculateGoldForCurrentWave(wave: number): number {
    let goldForCurrentWave: number;

    const x = wave;
    const x0 = 50; // lowest amount of gold per round
    const L = 500; // highest amount of gold per round
    const k = 0.06;

    const pow = (-k * x) - (-k * x0); // -k(x - x0)
    const equation = 1 + Math.pow(Math.E, pow) // 1 + e^-k(x-x0)

    goldForCurrentWave = L / equation; // L / 1 + e^-k(x-x0)

    return Math.round(goldForCurrentWave);
  }

  private calculateSpawnRateForCurrentWave(wave: number): number {
    let spawnRate: number;

    const x = wave;
    const x0 = 50;
    const L = 500; // fastest spawn rate (ms)
    const k = -0.1;
    const z = 500;

    const pow = (-k * x) - (-k * x0); // -k(x - x0)
    const equation = 1 + Math.pow(Math.E, pow) // 1 + e^-k(x-x0)

    spawnRate = z + (L / equation); // L / 1 + e^-k(x-x0)

    return spawnRate;
  }

  private setupWindowSubjects(): void {
    this.currentWaveSubject$ = (window as any).portalsTD.currentWaveSubject$;
    this.currentWaveSubject$.next(this.currentWave);

    this.lastWaveSubject$ = (window as any).portalsTD.lastWaveSubject$;
    this.lastWaveSubject$.next(this.maxWaves);
  }
}
