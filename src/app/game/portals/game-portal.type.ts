import { ArcanePortal } from "./arcane/arcane.portal";
import { FirePortal } from "./fire/fire.portal";
import { IcePortal } from "./ice/ice.portal";
import { PoisonPortal } from "./poison/poison.portal";

export type GamePortal =
  FirePortal |
  IcePortal |
  ArcanePortal |
  PoisonPortal;
