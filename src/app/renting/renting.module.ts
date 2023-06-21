import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RentingRoutingModule} from "./renting-routing.module";
import { CarsPrincipalPage } from './pages/cars-principal-page/cars-principal-page';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { RentingOrderItemsComponent } from './components/renting-items/renting-order-items/renting-order-items.component';
import {VehicleCardComponent} from "./components/vehicles/vehicle-card/vehicle-card.component";
import { SelectedRentingOrderItemDialogComponent } from './components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component';
import { EditFormCarComponent } from './components/vehicles/edit-form-car/edit-form-car.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CreateCarFormComponent } from './components/vehicles/create-car-form/create-car-form.component';
import { CarInfoComponent } from './pages/car-info/car-info.component';
import { CreateRentingItemComponent } from './components/renting-items/create-renting-item/create-renting-item.component';
import { TemporalComponent } from './components/temporal/temporal/temporal.component';
import { RentingOrderHistoryComponent } from './components/renting-items/renting-order-history/renting-order-history.component';
import { RentingItemsAceptedComponent } from './components/renter/renting-items-acepted/renting-items-acepted.component';


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
    CarInfoComponent,
    CreateRentingItemComponent,
    TemporalComponent,
    RentingOrderHistoryComponent,
    RentingItemsAceptedComponent
  ],
  exports: [
    CarsPrincipalPage
  ],
    imports: [
        CommonModule,
        RentingRoutingModule,
        PrimeNgModule,
        ReactiveFormsModule
    ],
  providers:[DatePipe]
})
export class RentingModule { }
