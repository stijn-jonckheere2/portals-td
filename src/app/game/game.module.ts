
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../core/core.module';
import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './page/game-page.component';

@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    GameRoutingModule
  ],
  exports: [],
  providers: [],
})
export class GameModule { }
