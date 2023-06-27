import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import {MaintenanceVehiclesComponent} from "./pages/maintenance-vehicles/maintenance-vehicles.component";

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'chat-box', component: WorkshopChatComponent },
    { path: 'maintenance-vehicles', component: MaintenanceVehiclesComponent },

  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class WorkshopRoutingModule { }
