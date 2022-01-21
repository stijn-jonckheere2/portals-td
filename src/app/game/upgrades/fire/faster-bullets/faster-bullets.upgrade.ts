import { FirePortal } from "src/app/game/portals/fire/fire.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class FasterBulletsUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Faster bullets';
  static UPGRADE_DESCRIPTION: string = 'More fire orbs is always better';
  static UPGRADE_COST: number = 400;

  override parent: FirePortal;

  constructor(parent: FirePortal) {
    super(parent);
  }

  override onPurchase(): void {
      super.onPurchase();
      this.parent.stopShooting();
      this.parent.firingSpeed = Math.ceil(this.parent.firingSpeed * 1.35);
      this.parent.startShooting();
  }
}
