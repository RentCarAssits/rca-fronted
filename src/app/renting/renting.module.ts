import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RentingRoutingModule} from "./renting-routing.module";
import { CarsPrincipalPage } from './pages/cars-principal-page/cars-principal-page';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";



@NgModule({
  declarations: [
    CarsPrincipalPage,
    DashboardComponent
  ],
  exports: [
    CarsPrincipalPage
  ],
  imports: [
    CommonModule,
    RentingRoutingModule,
    PrimeNgModule,
    MenuModule,
    TableModule,
    ChartModule,
  ]
})
export class RentingModule { }
