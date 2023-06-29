import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import { WorkshopRoutingModule } from './workshop-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {ReactiveFormsModule} from "@angular/forms";
import { WorkshopAComponent } from './components/workshop/workshop.component';
import { CreateWorkshopItemComponent } from './components/create-workshop-item/create-workshop-item.component';

@NgModule({
  declarations: [WorkshopChatComponent, WorkshopAComponent, CreateWorkshopItemComponent],
  exports: [WorkshopChatComponent],
    imports: [CommonModule, WorkshopRoutingModule, PrimeNgModule, ReactiveFormsModule],
})
export class WorkshopModule {}
