

export function initEnemyAnim(anims: any, spriteKey: string, frameRate = 8): void {
  anims.create({
    key: 'walkDown',
    frames: anims.generateFrameNumbers(spriteKey, {
      frames: [0, 4, 8, 12]
    }),
    frameRate,
    repeat: -1
  });

  anims.create({
    key: 'walkUp',
    frames: anims.generateFrameNumbers(spriteKey, {
      frames: [1, 5, 9, 13]
    }),
    frameRate,
    repeat: -1
  });

  anims.create({
    key: 'walkLeft',
    frames: anims.generateFrameNumbers(spriteKey, {
      frames: [2, 6, 10, 14]
    }),
    frameRate,
    repeat: -1
  });

  anims.create({
    key: 'walkRight',
    frames: anims.generateFrameNumbers(spriteKey, {
      frames: [3, 7, 11, 15]
    }),
    frameRate,
    repeat: -1
  });
}
