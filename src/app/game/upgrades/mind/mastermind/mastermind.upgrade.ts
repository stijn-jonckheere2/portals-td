import { PoisonPortal } from "src/app/game/portals/poison/poison.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class MastermindUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Mastermind';
  static UPGRADE_DESCRIPTION: string = 'Become a master of the psyche and control two orbs at once';
  static UPGRADE_COST: number = 4500;
  static override UPGRADE_LEVEL: number = 1;

  override parent: PoisonPortal;

  constructor(parent: PoisonPortal) {
    super(parent);
    this.cost = MastermindUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
      super.onPurchase();
  }
}
