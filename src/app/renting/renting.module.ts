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
import { AcceptedRentingItemsComponent } from './components/renting-items/accepted-renting-items/accepted-renting-items.component';
import { CreateRentingOrderDialogComponent } from './components/renting-order/create-renting-order-dialog/create-renting-order-dialog.component';
import { RentOrderOwnerComponent } from './components/owner/rent-order-owner/rent-order-owner.component';
import { RentOrderRenterComponent } from './components/renter/rent-order-renter/rent-order-renter.component';




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
    AcceptedRentingItemsComponent,
    CreateRentingOrderDialogComponent,
    RentOrderOwnerComponent,
    RentOrderRenterComponent,
    RentingOrderHistoryComponent
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
