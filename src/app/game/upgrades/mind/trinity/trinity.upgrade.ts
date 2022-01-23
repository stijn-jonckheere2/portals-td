import { PoisonPortal } from "src/app/game/portals/poison/poison.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class TrinityUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Trinity';
  static UPGRADE_DESCRIPTION: string = 'Ascend the mind to unleash the mental trinity';
  static UPGRADE_COST: number = 8000;
  static override UPGRADE_LEVEL: number = 2;

  override parent: PoisonPortal;

  constructor(parent: PoisonPortal) {
    super(parent);
    this.cost = TrinityUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
