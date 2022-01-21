import { FirePortal } from "src/app/game/portals/fire/fire.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class ExplosiveBulletsUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Explosive bullets';
  static UPGRADE_DESCRIPTION: string = 'Fire orbs now explode on impact dealing damage to nearby enemies';
  static UPGRADE_COST: number = 800;
  static override UPGRADE_LEVEL: number = 2;

  override parent: FirePortal;

  constructor(parent: FirePortal) {
    super(parent);
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
