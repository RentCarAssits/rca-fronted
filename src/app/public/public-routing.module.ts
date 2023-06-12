import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroComponent} from "./pages/hero/hero.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";



const routes: Routes = [
  { path: 'landing', component: HeroComponent },
  { path: 'page-not-found', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PublicRoutingModule { }
