import { BehaviorSubject } from 'rxjs';
import { waveData } from './data/wave.data';

export class WavesManager {
  currentWave: number = 1;
  maxWaves: number;

  currentWaveSubject$: BehaviorSubject<number>;
  lastWaveSubject$: BehaviorSubject<number>;

  constructor(maxWaves: number, currentWave = 1) {
    this.maxWaves = maxWaves;
    this.currentWave = currentWave;
  }

  init(): void {
    this.setupWindowSubjects();
  }

  getEnemies(): any[] {
    return waveData[this.currentWave];
  }

  getRoundWonReward(): number {
    return 50 + (this.currentWave * 10);
  }

  startNextWave(): void {
    if (this.currentWave < this.maxWaves) {
      this.currentWave++;
      this.currentWaveSubject$.next(this.currentWave);
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

  private setupWindowSubjects(): void {
    this.currentWaveSubject$ = (window as any).portalsTD.currentWaveSubject$;
    this.currentWaveSubject$.next(this.currentWave);

    this.lastWaveSubject$ = (window as any).portalsTD.lastWaveSubject$;
    this.lastWaveSubject$.next(this.maxWaves);
  }
}
