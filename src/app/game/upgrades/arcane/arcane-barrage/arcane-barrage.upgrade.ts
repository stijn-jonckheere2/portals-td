import { ArcanePortal } from "src/app/game/portals/arcane/arcane.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class ArcaneBarrageUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Arcane barrage';
  static UPGRADE_DESCRIPTION: string = 'Portal barrages the enemy with even faster missiles';
  static UPGRADE_COST: number = 1350;
  static override UPGRADE_LEVEL: number = 1;

  override parent: ArcanePortal;

  constructor(parent: ArcanePortal) {
    super(parent);
    this.cost = ArcaneBarrageUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
    super.onPurchase();
    this.parent.stopShooting();
    this.parent.firingSpeed = Math.ceil(this.parent.firingSpeed * 0.8);
    this.parent.startShooting();
  }
}
