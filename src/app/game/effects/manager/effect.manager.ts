import { BaseUnit } from "../../enemies/base/base.unit";
import { BaseScene } from "../../scenes/base.scene";
import { BaseEffect } from "../base/base.effect";

export class EffectManager {
  scene: BaseScene;

  constructor(scene) {
    this.scene = scene;
  }

  playEffectOn(spriteKey: string, effectKey: string, target: BaseUnit): void {
    const effect = new BaseEffect(this.scene, target.x, target.y, spriteKey, effectKey);
    effect.playOn(target);
  }
}
