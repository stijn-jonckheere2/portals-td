import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './core/components/root/root.component';

const routes: Routes = [
  {
    path: '', component: RootComponent, children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule),
      },
      { path: '', redirectTo: 'alerts', pathMatch: 'full' },
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
