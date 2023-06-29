import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopChatComponent } from './pages/workshop-chat/workshop-chat.component';
import { WorkshopAComponent } from './components/workshop/workshop.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'chat-box', component: WorkshopChatComponent },
  { path: 'workshop', component: WorkshopAComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkshopRoutingModule {}
