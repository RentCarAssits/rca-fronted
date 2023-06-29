import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SubscriptionsComponent} from "./subscriptions/subscriptions.component";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {PlansComponent} from './pages/plans/plans.component';
import {SubscriptionService} from "./services/subscription.service";


@NgModule({
  declarations: [
    SubscriptionsComponent,
    PlansComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    PrimeNgModule
  ],


})

export class SubscriptionModule {
}
