import { Component, OnInit } from "@angular/core";
import * as Phaser from 'phaser';
import { SceneConfig } from "../interfaces/scene.config";
import { BaseScene } from "../scenes/base.scene";

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
      scene: [BaseScene],
      physics: {
        default: 'arcade',
      },
      scale: {
        mode: Phaser.Scale.FIT,
        parent: 'portals-td-container',
        width: 800,
        height: 600
      }
    };

    this.portalsTDGame = new Phaser.Game(this.config);
  }
}
