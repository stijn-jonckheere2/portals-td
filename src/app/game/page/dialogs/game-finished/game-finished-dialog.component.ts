import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-game-finished-dialog",
  templateUrl: "./game-finished-dialog.component.html",
  styleUrls: ["./game-finished-dialog.component.scss"]
})

export class GameFinishedDialogComponent {

  constructor(public dialogRef: MatDialogRef<GameFinishedDialogComponent>) {
  }

  onCloseWindow(accepted: boolean = false): void {
    this.dialogRef.close({ accepted });
  }
}
