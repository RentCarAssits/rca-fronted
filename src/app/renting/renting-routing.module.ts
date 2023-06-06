import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarRentalListComponent} from "./pages/car-rental-list/car-rental-list.component";


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'cars-catalog', component: CarRentalListComponent },
  // Otras rutas específicas del módulo "modulo1"...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentingRoutingModule { }
