import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RentingRoutingModule} from "./renting-routing.module";
import { CarRentalListComponent } from './pages/car-rental-list/car-rental-list.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";



@NgModule({
  declarations: [
    CarRentalListComponent
  ],
  imports: [
    CommonModule,
    RentingRoutingModule,
    PrimeNgModule,
  ]
})
export class RentingModule { }
