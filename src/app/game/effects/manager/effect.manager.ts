import { BaseEnemy } from "../../enemies/base/base.enemy";
import { BaseScene } from "../../scenes/base.scene";
import { BaseEffect } from "../base/base.effect";

export class EffectManager {
  scene: BaseScene;

  constructor(scene) {
    this.scene = scene;
  }

  playEffectOn(spriteKey: string, effectKey: string, target: BaseEnemy): void {
    const effect = new BaseEffect(this.scene, target.x, target.y, spriteKey, effectKey);
    effect.playOn(target);
  }
}
