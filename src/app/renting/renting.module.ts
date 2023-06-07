import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RentingRoutingModule} from "./renting-routing.module";
import { CarsPrincipalPage } from './pages/cars-principal-page/cars-principal-page';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import {MenuModule} from "primeng/menu";
import {TableModule} from "primeng/table";
import {ChartModule} from "primeng/chart";
import { RentingOrderItemsComponent } from './components/renting-items/renting-order-items/renting-order-items.component';
import {VehicleCardComponent} from "./components/vehicles/vehicle-card/vehicle-card.component";


import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SelectedRentingOrderItemDialogComponent } from './components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component';


@NgModule({
  declarations: [
    CarsPrincipalPage,
    DashboardComponent,
    DashboardComponent,
    RentingOrderItemsComponent,
    VehicleCardComponent,
    SelectedRentingOrderItemDialogComponent
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
    DialogModule,
    DynamicDialogModule
  ]
})
export class RentingModule { }
