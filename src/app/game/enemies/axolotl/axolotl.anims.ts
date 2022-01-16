import { AxolotlEnemy } from './axolotl.enemy';

export function initAxolotlAnims(anims): void {
  anims.create({
    key: 'walkDown',
    frames: anims.generateFrameNumbers(AxolotlEnemy.SPRITE_KEY, {
      frames: [0, 4, 8, 12]
    }),
    frameRate: 8,
    repeat: -1
  });

  anims.create({
    key: 'walkUp',
    frames: anims.generateFrameNumbers(AxolotlEnemy.SPRITE_KEY, {
      frames: [1, 5, 9, 13]
    }),
    frameRate: 8,
    repeat: -1
  });

  anims.create({
    key: 'walkLeft',
    frames: anims.generateFrameNumbers(AxolotlEnemy.SPRITE_KEY, {
      frames: [2, 6, 10, 14]
    }),
    frameRate: 8,
    repeat: -1
  });

  anims.create({
    key: 'walkRight',
    frames: anims.generateFrameNumbers(AxolotlEnemy.SPRITE_KEY, {
      frames: [3, 7, 11, 15]
    }),
    frameRate: 8,
    repeat: -1
  });
}
