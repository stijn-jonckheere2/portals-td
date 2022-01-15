
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [
    RootComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    RootComponent,
  ],
  providers: [],
})
export class CoreModule { }

