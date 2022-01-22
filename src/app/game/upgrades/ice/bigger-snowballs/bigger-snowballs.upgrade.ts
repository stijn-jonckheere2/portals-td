import { IcePortal } from "src/app/game/portals/ice/ice.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class BiggerSnowballsUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Bigger snowballs';
  static UPGRADE_DESCRIPTION: string = 'Snow orbs now explode on impact dealing damage and slowing to nearby enemies';
  static UPGRADE_COST: number = 1750;
  static override UPGRADE_LEVEL: number = 1;

  override parent: IcePortal;

  constructor(parent: IcePortal) {
    super(parent);
    this.cost = BiggerSnowballsUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
