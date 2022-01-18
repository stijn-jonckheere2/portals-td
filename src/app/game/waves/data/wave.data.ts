
import { AxolotlEnemy } from "../../enemies/axolotl/axolotl.enemy";
import { BaseEnemy } from "../../enemies/base/base.enemy";
import { MoleEnemy } from "../../enemies/mole/mole.enemy";
import { ReptileEnemy } from "../../enemies/reptile/reptile.enemy";
import { generateEnemy } from "./generate-enemy.util";

const allTypes: (typeof BaseEnemy)[] = [
  AxolotlEnemy,
  MoleEnemy,
  ReptileEnemy,
];

export const waveData = (maxWaves: number) => {
  const enemiesPerWave = {};

  for (let i = 1; i <= maxWaves; i++) {
    const enemyTypes = allTypes.filter(type => type.MIN_WAVE <= i);
    enemiesPerWave[`${i}`] = [];

    enemyTypes.forEach((type: typeof BaseEnemy) => {
      enemiesPerWave[`${i}`][`${type.name}`] = [
        ...generateEnemy(type, type.MIN_WAVE, i)
      ];
    });
  }

  return enemiesPerWave;
}
