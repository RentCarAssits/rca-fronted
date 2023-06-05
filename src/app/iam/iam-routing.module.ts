import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  /*{ path: 'landing', component: HeroComponent },
  { path: 'page-not-found', component: NotFoundComponent },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IamRoutingModule { }
