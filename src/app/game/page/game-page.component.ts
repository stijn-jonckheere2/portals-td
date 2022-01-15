import { Component, OnInit } from "@angular/core";
import * as Phaser from 'phaser';
import { SceneConfig } from "../interfaces/scene-config.interface";
import { GrasslandScene } from "../scenes/grassland.scene";
import { PreloadScene } from "../scenes/preload.scene";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})

export class GamePageComponent implements OnInit {

  portalsTDGame: Phaser.Game;
  config: SceneConfig;

  constructor() {
  }

  ngOnInit() {
    this.config = {
      type: Phaser.AUTO,
      scene: [PreloadScene, GrasslandScene],
      physics: {
        default: 'arcade',
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'portals-td-container',
        width: 1920,
        height: 1080
      }
    };

    this.portalsTDGame = new Phaser.Game(this.config);
  }
}
