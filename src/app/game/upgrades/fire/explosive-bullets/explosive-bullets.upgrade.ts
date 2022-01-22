import { FirePortal } from "src/app/game/portals/fire/fire.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class ExplosiveBulletsUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Explosive bullets';
  static UPGRADE_DESCRIPTION: string = 'Fire orbs now explode on impact dealing increased damage to nearby enemies';
  static UPGRADE_COST: number = 3900;
  static override UPGRADE_LEVEL: number = 2;

  override parent: FirePortal;

  constructor(parent: FirePortal) {
    super(parent);
    this.cost = ExplosiveBulletsUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
