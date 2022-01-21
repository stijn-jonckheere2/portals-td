import { PoisonPortal } from "src/app/game/portals/poison/poison.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class PoisonCloudIUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Poison cloud I';
  static UPGRADE_DESCRIPTION: string = 'Deals more poison damage over time';
  static UPGRADE_COST: number = 1150;
  static override UPGRADE_LEVEL: number = 1;

  override parent: PoisonPortal;

  constructor(parent: PoisonPortal) {
    super(parent);
    this.cost = PoisonCloudIUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
