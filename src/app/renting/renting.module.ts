import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
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
import { EditFormCarComponent } from './components/vehicles/edit-form-car/edit-form-car.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateCarFormComponent } from './components/vehicles/create-car-form/create-car-form.component';
import { CarInfoComponent } from './pages/car-info/car-info.component';


@NgModule({
  declarations: [
    CarsPrincipalPage,
    DashboardComponent,
    DashboardComponent,
    RentingOrderItemsComponent,
    VehicleCardComponent,
    SelectedRentingOrderItemDialogComponent,
    EditFormCarComponent,
    CreateCarFormComponent,
    CarInfoComponent
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
        DynamicDialogModule,
        ReactiveFormsModule
    ],
  providers:[DatePipe]
})
export class RentingModule { }
