import Phaser from 'phaser';
import { BaseScene } from '../../scenes/base.scene';

export abstract class BaseEnemy extends Phaser.Physics.Arcade.Sprite {

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string) {
    super(scene, x, y, spriteKey);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  addCollider(collisionTarget, callback?): void {
    this.scene.physics.add.collider(this, collisionTarget, callback, null, this);
  }
}
