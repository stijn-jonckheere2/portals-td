
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LevelsRoutingModule } from './levels-routing.module';
import { LevelsPageComponent } from './levels/levels-page.component';

@NgModule({
  declarations: [
    LevelsPageComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    LevelsRoutingModule,
  ],
  exports: [],
  providers: [],
})
export class LevelsModule { }
