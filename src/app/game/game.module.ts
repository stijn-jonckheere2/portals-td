
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { GamePageComponent } from './page/game-page.component';
import { PortalUpgradeComponent } from './page/portal-upgrade/portal-upgrade.component';
import { GameFinishedDialogComponent } from './page/dialogs/game-finished/game-finished-dialog.component';
import { GameOverDialogComponent } from './page/dialogs/game-over/game-over-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GamePageComponent,
    PortalUpgradeComponent,

    // Dialogs
    GameFinishedDialogComponent,
    GameOverDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [],
  providers: [],
})
export class GameModule { }
