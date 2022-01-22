import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LevelsPageComponent } from "./levels/levels-page.component";

const routes: Routes = [
  {
    path: '', component: LevelsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelsRoutingModule { }
