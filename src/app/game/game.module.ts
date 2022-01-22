
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CoreModule } from '../core/core.module';
import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './page/game-page.component';
import { PortalUpgradeComponent } from './page/portal-upgrade/portal-upgrade.component';
import { GameFinishedDialogComponent } from './page/dialogs/game-finished/game-finished-dialog.component';
import { GameOverDialogComponent } from './page/dialogs/game-over/game-over-dialog.component';

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
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    GameRoutingModule
  ],
  exports: [],
  providers: [],
})
export class GameModule { }
