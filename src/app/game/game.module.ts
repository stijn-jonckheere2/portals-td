
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './page/game-page.component';

@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ],
  exports: [],
  providers: [],
})
export class GameModule { }
