import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BaseGameScene } from "src/app/game/scenes/base-game.scene";
import { GrasslandScene } from "src/app/game/scenes/grassland.scene";
import { KingInTheNorthScene } from "src/app/game/scenes/king-in-the-north.scene";

@Component({
  selector: "app-levels-page",
  templateUrl: "./levels-page.component.html",
  styleUrls: ["./levels-page.component.scss"]
})

export class LevelsPageComponent implements OnInit {
  levels: any[];
  playerProgress: number;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.levels = [
      GrasslandScene,
      KingInTheNorthScene,
    ];

    this.getPlayerProgress();
  }

  getPlayerProgress(): void {
    const progress = localStorage.getItem('portalstd_player-progress');

    if (!progress) {
      this.playerProgress = 1;
      localStorage.setItem('portalstd_player-progress', this.playerProgress.toString());
      return;
    }

    this.playerProgress = +progress;
  }

  onLevelSelected(levelKey: string): void {
    this.router.navigateByUrl(`/game?levelKey=${levelKey}`);
  }
}
