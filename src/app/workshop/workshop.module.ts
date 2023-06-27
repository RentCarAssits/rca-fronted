import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WorkshopChatComponent} from './pages/workshop-chat/workshop-chat.component';
import {WorkshopRoutingModule} from './workshop-routing.module';
import {PrimeNgModule} from '../prime-ng/prime-ng.module';
import {ReactiveFormsModule} from "@angular/forms";
import {MaintenanceVehiclesComponent} from "./pages/maintenance-vehicles/maintenance-vehicles.component";
import {
  MaintenanceVehicleCardComponent
} from "./components/maintenance-vehicle-card/maintenance-vehicle-card.component";


@NgModule({
  declarations: [WorkshopChatComponent, MaintenanceVehiclesComponent, MaintenanceVehicleCardComponent],
  exports: [WorkshopChatComponent],
  imports: [CommonModule, WorkshopRoutingModule, PrimeNgModule, ReactiveFormsModule],
})
export class WorkshopModule {
}
