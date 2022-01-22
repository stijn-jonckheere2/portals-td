import { FirePortal } from "src/app/game/portals/fire/fire.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class FasterBulletsUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Faster bullets';
  static UPGRADE_DESCRIPTION: string = 'Shoot faster and increase damage per orb';
  static UPGRADE_COST: number = 1600;

  override parent: FirePortal;

  constructor(parent: FirePortal) {
    super(parent);
    this.cost = FasterBulletsUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
    super.onPurchase();
    this.parent.stopShooting();
    this.parent.firingSpeed = Math.ceil(this.parent.firingSpeed * 0.85);
    this.parent.startShooting();
  }
}
