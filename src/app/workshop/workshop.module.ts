import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import { WorkshopRoutingModule } from './workshop-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {ReactiveFormsModule} from "@angular/forms";
import { WorkshopAComponent } from './components/workshop/workshop.component';
import { CreateWorkshopItemComponent } from './components/create-workshop-item/create-workshop-item.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { WarehouseCreationComponent } from './components/warehouse-creation/warehouse-creation.component';
import { MaintenanceComponent } from './pages/maintenance/maintenance.component';
import { ServiceRequestListComponent } from './components/service-request/service-request-list/service-request-list.component';
import { CreateServiceRequestComponent } from './components/service-request/create-service-request/create-service-request.component';
import { ServiceRequestListMechanicComponent } from './components/service-request/service-request-list-mechanic/service-request-list-mechanic.component';
import { CreateDiagnosticComponent } from './components/diagnostic/create-diagnostic/create-diagnostic.component';
import { DiagnosticListComponent } from './components/diagnostic/diagnostic-list/diagnostic-list.component';
import { DiagnosticListMechanicComponent } from './components/diagnostic/diagnostic-list-mechanic/diagnostic-list-mechanic.component';
import { CreateProposalComponent } from './components/proposal/create-proposal/create-proposal.component';


@NgModule({
  declarations: [WorkshopChatComponent, WorkshopAComponent, CreateWorkshopItemComponent, WarehouseComponent, WarehouseCreationComponent, MaintenanceComponent, ServiceRequestListComponent, CreateServiceRequestComponent, ServiceRequestListMechanicComponent, CreateDiagnosticComponent, DiagnosticListComponent, DiagnosticListMechanicComponent, CreateProposalComponent],
  exports: [WorkshopChatComponent],
    imports: [CommonModule, WorkshopRoutingModule, PrimeNgModule, ReactiveFormsModule],
})
export class WorkshopModule {}
