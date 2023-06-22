import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SubscriptionsComponent } from "./subscriptions/subscriptions.component";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";


@NgModule({
    declarations: [
        SubscriptionsComponent,
    ],
    exports: [
    ],
    imports: [
          CommonModule,
          PrimeNgModule
   ],
   
 
  })

export class SubscriptionModule {}
