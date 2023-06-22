import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CarsPrincipalPage} from "./pages/cars-principal-page/cars-principal-page";
import {DashboardComponent} from "./pages/dashboard/dashboard/dashboard.component";
import {CarInfoComponent} from "./pages/car-info/car-info.component";
import {TemporalComponent} from "./components/temporal/temporal/temporal.component";
import { SubscriptionsComponent } from '../subscriptions/subscriptions/subscriptions.component';



const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'cars-catalog', component: CarsPrincipalPage },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'car-info-request', component: CarInfoComponent },
  { path: 'we-are-working/full-catalog', component: TemporalComponent },
  { path: 'we-are-working/subscription', component: TemporalComponent },
  { path: 'we-are-working/chatBox', component: TemporalComponent },
  { path: 'we-are-working/statistics', component: TemporalComponent },
  { path: 'we-are-working/profile', component: TemporalComponent },
  { path: 'we-are-working/settings', component: TemporalComponent },
  // Otras rutas específicas del módulo "modulo1"...
  {path: 'Subscriptions/subscription-section', component: SubscriptionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentingRoutingModule { }


