import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import { WorkshopAComponent } from './components/workshop/workshop.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import {MaintenanceComponent} from "./pages/maintenance/maintenance.component";
import {CreateProposalComponent} from "./components/proposal/create-proposal/create-proposal.component";

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'chat-box', component: WorkshopChatComponent },
  { path: 'workshop', component: WorkshopAComponent },
  { path: 'warehouse/:id', component: WarehouseComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'maintenance/diagnostic/:id/proposal', component: CreateProposalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopRoutingModule {}
