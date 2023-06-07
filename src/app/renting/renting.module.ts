import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RentingRoutingModule} from "./renting-routing.module";
import { CarRentalListComponent } from './pages/car-rental-list/car-rental-list.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import { RentingOrderItemsComponent } from './components/renting-items/renting-order-items/renting-order-items.component';



@NgModule({
  declarations: [
    CarRentalListComponent,
    DashboardComponent,
    RentingOrderItemsComponent
  ],
  exports: [
    CarRentalListComponent
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
