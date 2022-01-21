import { EnemyDifficultySetting } from './enemy-difficulty-setting.interface';

export const EnemyDifficultySettings: { [key: string]: EnemyDifficultySetting } = {

  // AXOLOTL
  AxolotlEnemy: {
    minWave: 1,
    maxWave: 40,
    healthEquivalent: 1,
    distanceToSibling: 500,
    speed: 150,
  },

  // BAMBOO
  BambooEnemy: {
    minWave: 3,
    maxWave: 50,
    healthEquivalent: 2,
    distanceToSibling: 650,
    speed: 125,
  },

  // MOLE
  MoleEnemy: {
    minWave: 10,
    maxWave: 60,
    healthEquivalent: 7,
    distanceToSibling: 750,
    speed: 100,
  },

  // OWL
  OwlEnemy: {
    minWave: 15,
    maxWave: 65,
    healthEquivalent: 5,
    distanceToSibling: 750,
    speed: 250,
  },

  // LARVA
  LarvaEnemy: {
    minWave: 20,
    maxWave: 70,
    healthEquivalent: 22,
    distanceToSibling: 4000,
    speed: 75,
  },

  // BUTTERFLY
  ButterflyEnemy: {
    minWave: 0,
    maxWave: 0,
    healthEquivalent: 0.5,
    distanceToSibling: 200,
    speed: 200,
  },

  // REPTILE
  ReptileEnemy: {
    minWave: 30,
    maxWave: 100,
    healthEquivalent: 20,
    distanceToSibling: 1000,
    speed: 200,
  },

  // LIZARD
  LizardEnemy: {
    minWave: 40,
    maxWave: 100,
    healthEquivalent: 17,
    distanceToSibling: 850,
    speed: 250,
  },

  // SLIME
  SlimeEnemy: {
    minWave: 50,
    maxWave: 100,
    healthEquivalent: 24,
    distanceToSibling: 1000,
    speed: 100,
  },

  // BABY SLIME
  BabySlimeEnemy: {
    minWave: 0,
    maxWave: 0,
    healthEquivalent: 12,
    distanceToSibling: 3500,
    speed: 75,
  },

  // OCTOPUS
  OctopusEnemy: {
    minWave: 55,
    maxWave: 90,
    healthEquivalent: 8,
    distanceToSibling: 240,
    speed: 160,
  },

  // BEAST
  BeastEnemy: {
    minWave: 60,
    maxWave: 100,
    healthEquivalent: 14,
    distanceToSibling: 200,
    speed: 175,
  },

  // SPIRIT
  SpiritEnemy: {
    minWave: 70,
    maxWave: 100,
    healthEquivalent: 9,
    distanceToSibling: 150,
    speed: 235,
  },

  // SKULL
  SkullEnemy: {
    minWave: 80,
    maxWave: 100,
    healthEquivalent: 18,
    distanceToSibling: 250,
    speed: 185,
  },

  // DRAGON
  DragonEnemy: {
    minWave: 87,
    maxWave: 100,
    healthEquivalent: 35,
    distanceToSibling: 500,
    speed: 145,
  },

  // FLAME
  FlameEnemy: {
    minWave: 90,
    maxWave: 100,
    healthEquivalent: 14,
    distanceToSibling: 400,
    speed: 275,
  },

};
