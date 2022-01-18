import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import * as Phaser from 'phaser';
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { PortalElement } from "../portals/portal-element.enum";
import { PortalPrice } from "../portals/portal-price.enum";
import { GrasslandScene } from "../scenes/grassland.scene";
import { PreloadScene } from "../scenes/preload.scene";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})

export class GamePageComponent implements OnInit, OnDestroy {

  portalsTDGame: Phaser.Game;
  config: SceneConfig;
  PortalElement = PortalElement;
  PortalPrice = PortalPrice;

  activePortalElement$: Observable<PortalElement>;
  portalSelectedSubject$ = new Subject<PortalElement>();

  levelGoldSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
  levelHealthSubject$: BehaviorSubject<number> = new BehaviorSubject(0);
  currentWaveSubject$: BehaviorSubject<number> = new BehaviorSubject(1);
  lastWaveSubject$: BehaviorSubject<number> = new BehaviorSubject(1);
  levelFastForwardSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
  }

  ngOnInit() {
    this.config = {
      type: Phaser.AUTO,
      scene: [PreloadScene, GrasslandScene],
      physics: {
        default: 'arcade',
        arcade: {
          // timeScale: 2
          // debug: true,
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'portals-td-container',
        width: 1920,
        height: 1080
      },
    };

    this.portalsTDGame = new Phaser.Game(this.config);

    this.activePortalElement$ = this.portalSelectedSubject$.asObservable();
    this.setupWindowSubjects();
  }

  onActivatePortal(element: PortalElement, price: PortalPrice): void {
    if (!this.portalPurchasable(price)) {
      return;
    }

    this.portalSelectedSubject$.next(null);
    this.portalSelectedSubject$.next(element);
  }

  onDeactivatePortal(): void {
    this.portalSelectedSubject$.next(null);
  }

  ngOnDestroy(): void {
    this.portalsTDGame.destroy(true);
  }

  portalPurchasable(price: PortalPrice): boolean {
    return this.levelGoldSubject$?.value >= price;
  }

  toggleFastForward(): void {
    this.levelFastForwardSubject$.next(!this.levelFastForwardSubject$.value);
  }

  private setupWindowSubjects(): void {
    (window as any).portalsTD = {
      ...(window as any).portalsTD,
      portalSelectedSubject$: this.portalSelectedSubject$,
      levelGoldSubject$: this.levelGoldSubject$,
      levelHealthSubject$: this.levelHealthSubject$,
      currentWaveSubject$: this.currentWaveSubject$,
      lastWaveSubject$: this.lastWaveSubject$,
      levelFastForwardSubject$: this.levelFastForwardSubject$,
    };
  }
}
