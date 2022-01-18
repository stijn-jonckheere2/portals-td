import { AxolotlEnemy } from "../../enemies/axolotl/axolotl.enemy";
import { MoleEnemy } from "../../enemies/mole/mole.enemy";
import { ReptileEnemy } from "../../enemies/reptile/reptile.enemy";
import { generateEnemy } from "./generate-enemy.util";

export const waveData = {
  1: [
    ...generateEnemy(AxolotlEnemy, 15),
  ],
  2: [
    ...generateEnemy(AxolotlEnemy, 25),
  ],
  3: [
    ...generateEnemy(AxolotlEnemy, 40),
    ...generateEnemy(MoleEnemy, 5),
  ],
  4: [
    ...generateEnemy(AxolotlEnemy, 5),
    ...generateEnemy(MoleEnemy, 5),
    ...generateEnemy(AxolotlEnemy, 5),
    ...generateEnemy(MoleEnemy, 5),

  ],
  5: [
    ...generateEnemy(AxolotlEnemy, 5),
    ...generateEnemy(MoleEnemy, 5),
    ...generateEnemy(AxolotlEnemy, 5),
    ...generateEnemy(MoleEnemy, 5),
  ],
  6: [
    ...generateEnemy(AxolotlEnemy, 7),
    ...generateEnemy(MoleEnemy, 7),
    ...generateEnemy(AxolotlEnemy, 7),
    ...generateEnemy(MoleEnemy, 7),
  ],
  7: [
    ...generateEnemy(AxolotlEnemy, 9),
    ...generateEnemy(MoleEnemy, 9),
    ...generateEnemy(AxolotlEnemy, 9),
    ...generateEnemy(MoleEnemy, 9),
  ],
  8: [
    ...generateEnemy(AxolotlEnemy, 10),
    ...generateEnemy(MoleEnemy, 10),
    ...generateEnemy(AxolotlEnemy, 10),
    ...generateEnemy(MoleEnemy, 10),
  ],
  9: [
    ...generateEnemy(AxolotlEnemy, 15),
    ...generateEnemy(MoleEnemy, 15),
    ...generateEnemy(AxolotlEnemy, 15),
    ...generateEnemy(MoleEnemy, 15),
  ],
  10: [
    ...generateEnemy(ReptileEnemy, 1),
  ],
}
