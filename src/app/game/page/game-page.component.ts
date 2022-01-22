import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as Phaser from 'phaser';
import { BehaviorSubject, filter, Observable, Subject, Subscription, tap } from "rxjs";
import { SceneConfig } from "../interfaces/scene-config.interface";
import { GamePortal } from "../portals/game-portal.type";
import { PortalElement } from "../portals/portal-element.enum";
import { PortalPrice } from "../portals/portal-price.enum";
import { GrasslandScene } from "../scenes/grassland.scene";
import { PreloadScene } from "../scenes/preload.scene";
import { KingInTheNorthScene } from "../scenes/king-in-the-north.scene";
import { MatDialog } from "@angular/material/dialog";
import { GameOverDialogComponent } from "./dialogs/game-over/game-over-dialog.component";
import { GameFinishedDialogComponent } from "./dialogs/game-finished/game-finished-dialog.component";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})
export class GamePageComponent implements OnInit, OnDestroy {

  portalsTDGame: Phaser.Game;
  PortalElement = PortalElement;
  PortalPrice = PortalPrice;

  activePortalElement$: Observable<PortalElement>;
  fastForwardState$: Observable<boolean>;
  pausedState$: Observable<boolean>;
  currentPortal$: Observable<GamePortal>;
  gameStarted$: Observable<number>;

  portalElementSelectedSubject$ = new Subject<PortalElement>();
  portalSelectedSubject$ = new Subject<GamePortal>();

  levelGoldSubject$: BehaviorSubject<number>;
  levelHealthSubject$: BehaviorSubject<number>;
  currentWaveSubject$: BehaviorSubject<number>;
  lastWaveSubject$: BehaviorSubject<number>;
  levelFastForwardSubject$: BehaviorSubject<boolean>;
  gameOverSubject$: BehaviorSubject<boolean>;
  gamePausedSubject$: BehaviorSubject<boolean>;
  startGameSubject$: BehaviorSubject<number>;
  restartGameSubject$: BehaviorSubject<any>;

  sub$ = new Subscription();

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    this.setupSubjects();

    const config: SceneConfig = {
      type: Phaser.CANVAS,
      scene: [PreloadScene, GrasslandScene, KingInTheNorthScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'portals-td-container',
        width: 1920,
        height: 1080,
      },
      fps: {
        target: 60,
        min: 30,
        forceSetTimeOut: true
      },
    };

    this.activePortalElement$ = this.portalElementSelectedSubject$.asObservable();
    this.fastForwardState$ = this.levelFastForwardSubject$.asObservable();
    this.pausedState$ = this.gamePausedSubject$.asObservable();
    this.currentPortal$ = this.portalSelectedSubject$.asObservable();
    this.gameStarted$ = this.startGameSubject$.asObservable();

    this.portalsTDGame = new Phaser.Game(config);

    const onGameOver$ = this.gameOverSubject$.asObservable().pipe(
      filter(value => value !== null),
      tap(value => {
        if (value) {
          this.handleGameFinished();
          return;
        }

        this.handleGameOver();
      })
    );

    this.sub$.add(onGameOver$.subscribe());

    this.startLevelScene();
  }

  restartGame(): void {
    this.restartGameSubject$.next(true);
  }

  setupSubjects(): void {
    this.levelGoldSubject$ = new BehaviorSubject(0);
    this.levelHealthSubject$ = new BehaviorSubject(0);
    this.currentWaveSubject$ = new BehaviorSubject(1);
    this.lastWaveSubject$ = new BehaviorSubject(1);
    this.levelFastForwardSubject$ = new BehaviorSubject(false);
    this.gameOverSubject$ = new BehaviorSubject(null);
    this.gamePausedSubject$ = new BehaviorSubject(null);
    this.startGameSubject$ = new BehaviorSubject(null);
    this.restartGameSubject$ = new BehaviorSubject(null);

    this.setupWindowSubjects();
  }

  startGame(): void {
    this.startGameSubject$.next(100);
    this.levelHealthSubject$.next(100000);
  }

  togglePause(flag: boolean): void {
    this.gamePausedSubject$.next(flag);
  }

  handleGameOver(): void {
    const dialog = this.dialog.open(GameOverDialogComponent, {
      width: '250px'
    });

    dialog.afterClosed().subscribe((result) => {
      if (result?.accepted) {
        this.restartGame();
        return;
      }

      this.router.navigate(['/levels']);
    });
  }

  handleGameFinished(): void {
    const dialog = this.dialog.open(GameFinishedDialogComponent, {
      width: '250px'
    });

    dialog.afterClosed().subscribe((result) => {
      const playerProgress = this.getPlayerProgress();
      this.savePlayerProgress(playerProgress + 1);

      this.router.navigate(['/levels']);
    });
  }

  startLevelScene(): void {
    const levelKey: string = this.route.snapshot.queryParams.levelKey;

    this.portalsTDGame.scene.start(PreloadScene.KEY, {
      nextLevelKey: levelKey
    });
  }

  onActivatePortal(element: PortalElement, price: PortalPrice): void {
    if (!this.portalPurchasable(price)) {
      return;
    }

    this.portalElementSelectedSubject$.next(null);
    this.portalElementSelectedSubject$.next(element);
  }

  onDeactivatePortal(): void {
    this.portalElementSelectedSubject$.next(null);
  }

  portalPurchasable(price: PortalPrice): boolean {
    return this.levelGoldSubject$?.value >= price;
  }

  toggleFastForward(flag: boolean): void {
    this.levelFastForwardSubject$.next(flag);
  }

  onPortalSold(): void {
    this.portalSelectedSubject$.next(null);
  }

  private getPlayerProgress(): number {
    const progress = localStorage.getItem('portalstd_player-progress');
    return progress !== null ? parseInt(progress) : null;
  }

  private savePlayerProgress(progress: number): void {
    localStorage.setItem('portalstd_player-progress', progress.toString());
  }

  private setupWindowSubjects(): void {
    (window as any).portalsTD = {
      ...(window as any).portalsTD,
      portalElementSelectedSubject$: this.portalElementSelectedSubject$,
      levelGoldSubject$: this.levelGoldSubject$,
      levelHealthSubject$: this.levelHealthSubject$,
      currentWaveSubject$: this.currentWaveSubject$,
      lastWaveSubject$: this.lastWaveSubject$,
      levelFastForwardSubject$: this.levelFastForwardSubject$,
      portalSelectedSubject$: this.portalSelectedSubject$,
      gameOverSubject$: this.gameOverSubject$,
      gamePausedSubject$: this.gamePausedSubject$,
      startGameSubject$: this.startGameSubject$,
      restartGameSubject$: this.restartGameSubject$,
    };
  }

  onExitGame(): void {
    this.router.navigate(['/levels']);
  }

  ngOnDestroy(): void {
    this.portalsTDGame.registry.destroy();
    this.portalsTDGame.anims.destroy();
    this.portalsTDGame.textures.destroy();
    this.portalsTDGame.scene.destroy();
    this.portalsTDGame.renderer.destroy();
    this.portalsTDGame.destroy(true);

    this.sub$.unsubscribe();
    delete (window as any).portalsTD;
  }
}
