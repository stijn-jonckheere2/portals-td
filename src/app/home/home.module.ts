
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './page/home-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
  ],
  imports: [HomeRoutingModule],
  exports: [],
  providers: [],
})
export class HomeModule { }
