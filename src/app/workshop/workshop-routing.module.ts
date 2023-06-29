import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import { WorkshopAComponent } from './components/workshop/workshop.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { InventoryComponent } from './components/inventory/inventory.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'chat-box', component: WorkshopChatComponent },
  { path: 'workshop', component: WorkshopAComponent },
  { path: ':id/warehouse', component: WarehouseComponent },
  { path: 'warehouse/:id/inventory', component: InventoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopRoutingModule {}
