import { ArrowDown } from '../../other/arrow.sprite';
import { BaseScene } from '../../scenes/base.scene';
import { BaseUpgrade } from '../../upgrades/base/base.upgrade';
import { PortalElement } from '../portal-element.enum';
import { PortalPrice } from '../portal-price.enum';
import { BaseUnit } from './base.unit';

export abstract class BasePortal extends BaseUnit {
  static SPRITE_KEY = 'portals';
  static SPRITE_1_KEY = 'portals1';
  static SPRITE_2_KEY = 'portals2';

  static SPRITE_URL = 'assets/sprites/portals/portals.png';
  static SPRITE_1_URL = 'assets/sprites/portals/portals-1.png';
  static SPRITE_2_URL = 'assets/sprites/portals/portals-2.png';

  price: PortalPrice;
  element: PortalElement;
  upgradeLevel: number = 0;

  arrowIcon: ArrowDown;
  radiusCircle: Phaser.GameObjects.Arc;

  constructor(scene: BaseScene, x: number, y: number, spriteKey: string, element: PortalElement) {
    super(scene, x, y, spriteKey);
    this.element = element;
    this.init();
  }

  override init(): void {
    super.init();
  }

  override update(time, delta) {
    super.update(time, delta);
  }

  toggleRadiusVisible(flag: boolean): void {
    if (!flag) {
      this.radiusCircle?.destroy();
      this.radiusCircle = null;
      return;
    }

    if (this.radiusCircle) {
      return;
    }

    const myCenter = this.getCenter();
    this.radiusCircle = this.baseScene.add.circle(myCenter.x, myCenter.y, this.maxRange / 2, null, 0);
    this.radiusCircle.setOrigin(0.5, 0.5);
    this.radiusCircle.setScale(1);
    this.radiusCircle.setStrokeStyle(2, 0xFFE000, 1);
    this.radiusCircle.setFillStyle(0xFFE000, 0.1);
  }

  upgrade(): void {
    this.upgradeLevel++;

    if (this.upgradeLevel === 1) {
      this.setTexture(BasePortal.SPRITE_1_KEY, this.element);
      return;
    }

    if (this.upgradeLevel === 2) {
      this.setTexture(BasePortal.SPRITE_2_KEY, this.element);
      return;
    }
  }

  toggleArrowIcon(flag: boolean): void {
    if (flag) {
      this.arrowIcon = new ArrowDown(this.baseScene, 0, 0, this);
      return;
    }

    this.arrowIcon.destroyEnemy();
    this.arrowIcon = null;
  }

  destroyEnemy(): void {
    this.radiusCircle?.destroy();
  }

  abstract addUpgrade(upgrade: BaseUpgrade): void;
}
