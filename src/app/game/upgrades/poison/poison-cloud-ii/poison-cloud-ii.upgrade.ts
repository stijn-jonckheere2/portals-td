import { PoisonPortal } from "src/app/game/portals/poison/poison.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class PoisonCloudIIUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Poison cloud II';
  static UPGRADE_DESCRIPTION: string = 'Deals massive poison damage over time';
  static UPGRADE_COST: number = 3550;
  static override UPGRADE_LEVEL: number = 2;

  override parent: PoisonPortal;

  constructor(parent: PoisonPortal) {
    super(parent);
    this.cost = PoisonCloudIIUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
