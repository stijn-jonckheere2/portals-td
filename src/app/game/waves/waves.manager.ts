import { BehaviorSubject, last } from 'rxjs';
import { AxolotlEnemy } from '../enemies/axolotl/axolotl.enemy';
import { BaseEnemy } from '../enemies/base/base.enemy';
import { MoleEnemy } from '../enemies/mole/mole.enemy';
import { ReptileEnemy } from '../enemies/reptile/reptile.enemy';
import { orderBy, times } from 'lodash';
import { LarvaEnemy } from '../enemies/larva/larva.enemy';
import { BambooEnemy } from '../enemies/bamboo/bamboo.enemy';
import { BeastEnemy } from '../enemies/beast/beast.enemy';
import { DragonEnemy } from '../enemies/dragon/dragon.enemy';
import { FlameEnemy } from '../enemies/flame/flame.enemy';
import { LizardEnemy } from '../enemies/lizard/lizard.enemy';
import { OctopusEnemy } from '../enemies/octopus/octopus.enemy';
import { OwlEnemy } from '../enemies/owl/owl.enemy';
import { SkullEnemy } from '../enemies/skull/skull.enemy';
import { SlimeEnemy } from '../enemies/slime/slime.enemy';
import { SpiritEnemy } from '../enemies/spirit/spirit.enemy';

export class WavesManager {
  private enemyVarietyFactor = 0.30; // lower means more variety
  private lateGameMultiplier = 1.029;
  private lateGameStart = 70;
  private startingWave: number;
  private rampingWaveHealthPool: number = null;

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

  get waveHealthPool(): number {
    return this.calculateHealthPoolForWave(this.currentWave);
  }

  private enemyPool: (typeof BaseEnemy)[] = [
    AxolotlEnemy,
    MoleEnemy,
    ReptileEnemy,
    LarvaEnemy,
    BambooEnemy,
    BeastEnemy,
    DragonEnemy,
    FlameEnemy,
    LizardEnemy,
    OctopusEnemy,
    OwlEnemy,
    ReptileEnemy,
    SkullEnemy,
    SlimeEnemy,
    SpiritEnemy,
  ];

  constructor(maxWaves: number, currentWave = 1) {
    this.maxWaves = maxWaves;
    this.currentWave = currentWave;
    this.startingWave = currentWave;
  }

  init(): void {
    this.setupWindowSubjects();
  }

  private getCurrentEnemyPool(): any[] {
    return this.enemyPool.filter((enemyClass: any) => {
      return enemyClass.MIN_WAVE <= this.currentWave && enemyClass.MAX_WAVE >= this.currentWave
    });
  }

  getEnemies(): (typeof BaseEnemy)[] {
    const waveEnemyPool: (typeof BaseEnemy)[] = orderBy(this.getCurrentEnemyPool(), ['MIN_WAVE'], ['desc']);

    let waveHealthPool = this.waveHealthPool;

    // Starting in late game, wave health starts ramping up based on the previous rounds' health pool
    if (this.currentWave > this.lateGameStart) {
      this.calculateRampingHealthPoolForWave(this.currentWave);
      waveHealthPool = this.rampingWaveHealthPool;
    }

    let remainingHealthPool: number = waveHealthPool;
    let leftOverHealthPool: number = 0;
    let waveEnemies: any = {};

    waveEnemyPool.some((enemy: (typeof BaseEnemy), index: number) => {
      let enemiesThatFit: number = Math.floor(remainingHealthPool / enemy.HEALTH);
      let lastEnemy: boolean = index === (waveEnemyPool.length - 1);
      let enemyFirstTime: boolean = enemy.MIN_WAVE === this.currentWave && enemy.MIN_WAVE > 1;

      if (enemyFirstTime) {
        // If it's the first time we spawn an enemy, only spawn a single one
        enemiesThatFit = 1;

      } else if (!lastEnemy && enemiesThatFit > 1) {
        // If we still have other types of enemies to spawn
        // And more than 1 enemy of the current type could fit
        // Then only spawn X% of the current type to allow for wave variety
        // Always spawn at least 1

        const flooredEnemies = Math.floor(enemiesThatFit * this.enemyVarietyFactor);
        enemiesThatFit = flooredEnemies > 0 ? flooredEnemies : 1;
      }

      if (enemiesThatFit > 0) {
        waveEnemies[enemy.name] = [];

        // while the enemy fits inside the pool, add it
        times(enemiesThatFit, () => {
          waveEnemies[enemy.name].push(enemy);
          remainingHealthPool -= enemy.HEALTH;
        });
      }

      // X% of the wave is allowed to remain unaccounted for
      // This will prevent low levels mobs from spawning on higher levels
      if (lastEnemy && remainingHealthPool <= enemy.HEALTH) {
        leftOverHealthPool = remainingHealthPool;
        return true;
      }

      return false;
    });

    console.log(`%cWave       -- ${this.currentWave}`, "color: cyan; padding: 4px 12px;");
    console.log(`%cWave HP    -- ${waveHealthPool}`, "color: orange; padding: 4px 12px;");
    console.log(`%cLeftover   -- ${leftOverHealthPool}`, "color: lightgreen; padding: 4px 12px;");
    console.log(`%cGold       -- ${this.goldReward}`, "color: yellow; padding: 4px 12px;");
    console.log(`%cSpawn      -- ${this.spawnRate}`, "color: pink; padding: 4px 12px;");
    console.log(`%cEnemies`, "color: coral; padding: 4px 12px;");
    console.log(waveEnemies);

    return waveEnemies;
  }

  startNextWave(requestedWave?: number): void {
    if (requestedWave) {
      this.startingWave = requestedWave;
      this.currentWave = requestedWave;
      this.currentWaveSubject$.next(this.currentWave);
      this.calculateRampingHealthPoolForWave(requestedWave);
      return;
    }

    if (this.currentWave < this.maxWaves) {
      this.currentWave++;
      this.currentWaveSubject$.next(this.currentWave);
    }
  }

  calculateRampingHealthPoolForWave(requestedWave: number): void {
    let startingWave: number = this.lateGameStart;
    this.rampingWaveHealthPool = this.calculateHealthPoolForWave(this.lateGameStart);

    while (startingWave < requestedWave) {
      this.rampingWaveHealthPool *= this.lateGameMultiplier;
      startingWave++;
    }
  }

  setMaxWaves(max: number): void {
    this.maxWaves = max;
    this.lastWaveSubject$.next(this.maxWaves);
  }

  resetWaves(): void {
    this.currentWave = 1;
    this.currentWaveSubject$.next(this.currentWave);
  }

  private calculateHealthPoolForWave(wave: number): number {
    let healthPoolForCurrentWave: number;

    const x = wave;
    const x0 = 50; // lowest HP pool per round
    const L = 30000; // highest HP pool per round
    const k = 0.08;

    const pow = (-k * x) - (-k * x0); // -k(x - x0)
    const equation = 1 + Math.pow(Math.E, pow) // 1 + e^-k(x-x0)

    healthPoolForCurrentWave = L / equation; // L / 1 + e^-k(x-x0)

    return Math.round(healthPoolForCurrentWave);
  }

  private calculateGoldForCurrentWave(wave: number): number {
    let goldForCurrentWave: number;

    const x = wave;
    const x0 = 50; // lowest amount of gold per round
    const L = 250; // highest amount of gold per round
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
