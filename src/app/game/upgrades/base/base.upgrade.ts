import { BasePortal } from "../../portals/base/base.portal";

export abstract class BaseUpgrade {
  static UPGRADE_LEVEL: number = 1;
  cost: number = 100;
  parent: BasePortal;

  constructor(parent: BasePortal) {
    this.parent = parent;
  }

  onPurchase(): void {
    this.parent.baseScene.spendGold(this.cost);
    this.parent.addUpgrade(this);
  }
}
