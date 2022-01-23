import { HolyPortal } from "src/app/game/portals/holy/holy.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class TwinBladesUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Twin blades';
  static UPGRADE_DESCRIPTION: string = 'Twice the fun, double the carnage';
  static UPGRADE_COST: number = 5600;
  static override UPGRADE_LEVEL: number = 2;

  override parent: HolyPortal;

  constructor(parent: HolyPortal) {
    super(parent);
    this.cost = TwinBladesUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
    super.onPurchase();
  }
}
