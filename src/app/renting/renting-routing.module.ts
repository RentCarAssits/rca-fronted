import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarsPrincipalPage} from "./pages/cars-principal-page/cars-principal-page";
import {DashboardComponent} from "./pages/dashboard/dashboard/dashboard.component";
import {CarInfoComponent} from "./pages/car-info/car-info.component";


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'cars-catalog', component: CarsPrincipalPage },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'car-info-request', component: CarInfoComponent },
  // Otras rutas específicas del módulo "modulo1"...
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentingRoutingModule { }
