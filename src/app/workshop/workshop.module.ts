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
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryCreateComponent } from './components/inventory-create/inventory-create.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

@NgModule({
  declarations: [WorkshopChatComponent, WorkshopAComponent, CreateWorkshopItemComponent, WarehouseComponent, WarehouseCreationComponent, InventoryComponent, InventoryCreateComponent, ProductCreateComponent],
  exports: [WorkshopChatComponent],
    imports: [CommonModule, WorkshopRoutingModule, PrimeNgModule, ReactiveFormsModule],
})
export class WorkshopModule {}
