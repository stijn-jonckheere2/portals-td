import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { BasePortal } from "../../portals/base/base.portal";
import { FirePortal } from "../../portals/fire/fire.portal";
import { GamePortal } from "../../portals/game-portal.type";
import { IcePortal } from "../../portals/ice/ice.portal";
import { BaseUpgrade } from "../../upgrades/base/base.upgrade";
import { ExplosiveBulletsUpgrade } from "../../upgrades/fire/explosive-bullets/explosive-bullets.upgrade";
import { FasterBulletsUpgrade } from "../../upgrades/fire/faster-bullets/faster-bullets.upgrade";
import { BiggerSnowballsUpgrade } from "../../upgrades/ice/bigger-snowballs/bigger-snowballs.upgrade";
import { MassiveSnowballsUpgrade } from "../../upgrades/ice/massive-snowballs/massive-snowballs.upgrade";

@Component({
  selector: "app-portal-upgrade",
  templateUrl: "./portal-upgrade.component.html",
  styleUrls: ["./portal-upgrade.component.scss"]
})
export class PortalUpgradeComponent implements OnChanges {
  @Input() portal: GamePortal;
  @Input() currentGold: number;

  possibleUpgrades: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.portal) {
      const previousPortal: BasePortal = changes.portal.previousValue;
      previousPortal?.toggleArrowIcon(false);

      if (changes.portal.currentValue) {
        this.calculatePossibleUpgrades();
        this.portal.toggleArrowIcon(true);
      }
    }
  }

  calculatePossibleUpgrades(): void {
    if (this.portal instanceof FirePortal) {
      this.possibleUpgrades = [
        FasterBulletsUpgrade,
        ExplosiveBulletsUpgrade,
      ];
      return;
    }

    if(this.portal instanceof IcePortal) {
      this.possibleUpgrades = [
        BiggerSnowballsUpgrade,
        MassiveSnowballsUpgrade,
      ];
      return;
    }

    this.possibleUpgrades = [];
  }

  onPurchaseUpgrade(upgradeType: any): void {
    const upgrade = new upgradeType(this.portal);
    const typedUpgrade = upgrade as BaseUpgrade;
    typedUpgrade.onPurchase();
  }

  upgradeBought(upgradeType: any): boolean {
    return upgradeType.UPGRADE_LEVEL <= this.portal.upgradeLevel;
  }

  upgradeDisabled(upgradeType: any): boolean {
    const levelAvailable = this.portal.upgradeLevel === upgradeType.UPGRADE_LEVEL - 1;
    const moneyAvailable = this.currentGold >= upgradeType.UPGRADE_COST;
    return !levelAvailable || !moneyAvailable;
  }
}
