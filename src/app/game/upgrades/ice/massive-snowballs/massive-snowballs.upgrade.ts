import { IcePortal } from "src/app/game/portals/ice/ice.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class MassiveSnowballsUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Massive snowballs';
  static UPGRADE_DESCRIPTION: string = 'The balls are seriously huge with this upgrade';
  static UPGRADE_COST: number = 4700;
  static override UPGRADE_LEVEL: number = 2;

  override parent: IcePortal;

  constructor(parent: IcePortal) {
    super(parent);
    this.cost = MassiveSnowballsUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
