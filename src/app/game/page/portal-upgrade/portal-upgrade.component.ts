import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { ArcanePortal } from "../../portals/arcane/arcane.portal";
import { BasePortal } from "../../portals/base/base.portal";
import { FirePortal } from "../../portals/fire/fire.portal";
import { HolyPortal } from "../../portals/holy/holy.portal";
import { IcePortal } from "../../portals/ice/ice.portal";
import { PoisonPortal } from "../../portals/poison/poison.portal";
import { ArcaneBarrageUpgrade } from "../../upgrades/arcane/arcane-barrage/arcane-barrage.upgrade";
import { ArcaneTurretUpgrade } from "../../upgrades/arcane/arcane-turret/arcane-turret.upgrade";
import { BaseUpgrade } from "../../upgrades/base/base.upgrade";
import { ExplosiveBulletsUpgrade } from "../../upgrades/fire/explosive-bullets/explosive-bullets.upgrade";
import { FasterBulletsUpgrade } from "../../upgrades/fire/faster-bullets/faster-bullets.upgrade";
import { WallSweepUpgrade } from "../../upgrades/holy/wall-sweep/wall-sweep.upgrade";
import { TwinBladesUpgrade } from "../../upgrades/holy/twin-blades/twin-blades.upgrade";
import { BiggerSnowballsUpgrade } from "../../upgrades/ice/bigger-snowballs/bigger-snowballs.upgrade";
import { MassiveSnowballsUpgrade } from "../../upgrades/ice/massive-snowballs/massive-snowballs.upgrade";
import { PoisonCloudIUpgrade } from "../../upgrades/poison/poison-cloud-i/poison-cloud-i.upgrade";
import { PoisonCloudIIUpgrade } from "../../upgrades/poison/poison-cloud-ii/poison-cloud-ii.upgrade";
import { MindPortal } from "../../portals/mind/mind.portal";
import { MastermindUpgrade } from "../../upgrades/mind/mastermind/mastermind.upgrade";
import { TrinityUpgrade } from "../../upgrades/mind/trinity/trinity.upgrade";

@Component({
  selector: "app-portal-upgrade",
  templateUrl: "./portal-upgrade.component.html",
  styleUrls: ["./portal-upgrade.component.scss"]
})
export class PortalUpgradeComponent implements OnChanges {
  @Input() portal: BasePortal;
  @Input() portalClass: any;
  @Input() currentGold: number;

  @Output() portalSold: EventEmitter<any> = new EventEmitter();

  get portalSellingPrice(): number {
    const portalPrice = this.portal?.price * 0.7;
    const upgradeBonus = (this.portal?.upgradeLevel * portalPrice) * 0.7;
    return Math.ceil(portalPrice + upgradeBonus);
  }

  possibleUpgrades: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.portal) {
      const previousPortal: BasePortal = changes.portal.previousValue;
      previousPortal?.toggleArrowIcon(false);

      if (changes.portal.currentValue) {
        this.portal.toggleArrowIcon(true);
      }
    }

    if (changes?.portalClass) {
      if (changes?.portalClass.currentValue) {
        this.calculatePossibleUpgrades();
      }
    }
  }

  calculatePossibleUpgrades(): void {
    if (this.portalClass === FirePortal) {
      this.possibleUpgrades = [
        FasterBulletsUpgrade,
        ExplosiveBulletsUpgrade,
      ];
      return;
    }

    if (this.portalClass === IcePortal) {
      this.possibleUpgrades = [
        BiggerSnowballsUpgrade,
        MassiveSnowballsUpgrade,
      ];
      return;
    }

    if (this.portalClass === PoisonPortal) {
      this.possibleUpgrades = [
        PoisonCloudIUpgrade,
        PoisonCloudIIUpgrade,
      ];
      return;
    }

    if (this.portalClass === ArcanePortal) {
      this.possibleUpgrades = [
        ArcaneBarrageUpgrade,
        ArcaneTurretUpgrade,
      ];
      return;
    }

    if (this.portalClass === HolyPortal) {
      this.possibleUpgrades = [
        WallSweepUpgrade,
        TwinBladesUpgrade,
      ];
      return;
    }

    if (this.portalClass === MindPortal) {
      this.possibleUpgrades = [
        MastermindUpgrade,
        TrinityUpgrade,
      ];
      return;
    }

    this.possibleUpgrades = [];
  }

  onPurchaseUpgrade(upgradeType: any): void {
    if (!this.portal) {
      return;
    }

    const upgrade = new upgradeType(this.portal);
    const typedUpgrade = upgrade as BaseUpgrade;
    typedUpgrade.onPurchase();
  }

  upgradeBought(upgradeType: any): boolean {
    if (!this.portal) {
      return false;
    }

    return upgradeType.UPGRADE_LEVEL <= this.portal.upgradeLevel;
  }

  upgradeDisabled(upgradeType: any): boolean {
    if (!this.portal) {
      return true;
    }

    const levelAvailable = this.portal.upgradeLevel === upgradeType.UPGRADE_LEVEL - 1;
    const moneyAvailable = this.currentGold >= upgradeType.UPGRADE_COST;
    return !levelAvailable || !moneyAvailable;
  }

  onSellPortal(): void {
    if (!this.portal) {
      return;
    }

    this.portal?.baseScene.earnGold(this.portalSellingPrice);
    this.portal?.destroyEnemy();
    this.portalSold.emit();
  }
}
