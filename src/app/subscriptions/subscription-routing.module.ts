import { RouterModule, Routes } from "@angular/router";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'subscriptionPlans', component: SubscriptionsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RentingRoutingModule { }
