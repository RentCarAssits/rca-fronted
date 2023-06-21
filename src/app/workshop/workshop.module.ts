import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import { WorkshopRoutingModule } from './workshop-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [WorkshopChatComponent],
  exports: [WorkshopChatComponent],
    imports: [CommonModule, WorkshopRoutingModule, PrimeNgModule, ReactiveFormsModule],
})
export class WorkshopModule {}
