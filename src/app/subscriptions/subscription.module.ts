import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";


@NgModule({
    declarations: [
        SubscriptionsComponent,
    ],
    exports: [
    ],
    imports: [
          CommonModule,
   ],
 
  })

export class SubscriptionModule {}