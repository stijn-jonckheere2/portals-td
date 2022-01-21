import { ExplosiveBulletsUpgrade } from "./explosive-bullets/explosive-bullets.upgrade";
import { FasterBulletsUpgrade } from "./faster-bullets/faster-bullets.upgrade";

export type FirePortalUpgrades =
  FasterBulletsUpgrade
  | ExplosiveBulletsUpgrade;
