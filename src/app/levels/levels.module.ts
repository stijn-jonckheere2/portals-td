
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LevelsPageComponent } from './levels/levels-page.component';

@NgModule({
  declarations: [
    LevelsPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [],
  providers: [],
})
export class LevelsModule { }
