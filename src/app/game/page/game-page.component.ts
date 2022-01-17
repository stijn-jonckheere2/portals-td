import { Component, OnDestroy, OnInit } from "@angular/core";
import * as Phaser from 'phaser';
import { Observable, Subject } from "rxjs";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { PortalElement } from "../portals/portal-element.enum";
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

  activePortalElement$: Observable<PortalElement>;
  portalElementSubject$ = new Subject<PortalElement>();

  constructor() {
  }

  ngOnInit() {
    this.config = {
      type: Phaser.AUTO,
      scene: [PreloadScene, GrasslandScene],
      physics: {
        default: 'arcade',
        arcade: {
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

    this.activePortalElement$ = this.portalElementSubject$.asObservable();

    (window as any).portalsTD = {
      portalElementSubject$: this.portalElementSubject$
    };
  }

  onActivatePortal(element: PortalElement): void {
    this.portalElementSubject$.next(null);
    this.portalElementSubject$.next(element);
  }

  onDeactivatePortal(): void {
    this.portalElementSubject$.next(null);
  }

  ngOnDestroy(): void {
    this.portalsTDGame.destroy(true);
  }
}
