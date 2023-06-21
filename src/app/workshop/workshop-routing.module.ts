import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'chat-box', component: WorkshopChatComponent },
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class WorkshopRoutingModule { }