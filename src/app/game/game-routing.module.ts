import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GamePageComponent } from "./page/game-page.component";

const routes: Routes = [
  { path: '', component: GamePageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoutingModule { }
