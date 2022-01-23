import { HolyPortal } from "src/app/game/portals/holy/holy.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class WallSweepUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Wall sweep';
  static UPGRADE_DESCRIPTION: string = 'Create a spinning wall that sweeps away your enemies';
  static UPGRADE_COST: number = 2700;
  override parent: HolyPortal;

  constructor(parent: HolyPortal) {
    super(parent);
    this.cost = WallSweepUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
    super.onPurchase();
  }
}
