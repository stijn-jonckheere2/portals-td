import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './core/components/root/root.component';
import { GamePageComponent } from './game/page/game-page.component';
import { HomePageComponent } from './home/page/home-page.component';
import { LevelsPageComponent } from './levels/levels/levels-page.component';

const routes: Routes = [
  {
    path: '', component: RootComponent, children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: 'levels',
        component: LevelsPageComponent,
      },
      {
        path: 'game',
        component: GamePageComponent,
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
