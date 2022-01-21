import { ArcanePortal } from "src/app/game/portals/arcane/arcane.portal";
import { BaseUpgrade } from "../../base/base.upgrade";

export class ArcaneTurretUpgrade extends BaseUpgrade {
  static UPGRADE_NAME: string = 'Arcane turret';
  static UPGRADE_DESCRIPTION: string = 'You wanted a turret? Here\'s a turret!';
  static UPGRADE_COST: number = 4150;
  static override UPGRADE_LEVEL: number = 2;

  override parent: ArcanePortal;

  constructor(parent: ArcanePortal) {
    super(parent);
    this.cost = ArcaneTurretUpgrade.UPGRADE_COST;
  }

  override onPurchase(): void {
    super.onPurchase();
    this.parent.stopShooting();
    this.parent.firingSpeed = Math.ceil(this.parent.firingSpeed * 0.8);
    this.parent.startShooting();
  }
}
