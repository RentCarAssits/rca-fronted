import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccoutPaymentComponent } from './pages/accout-Payment/accout-Payment.component';
import { BillingRoutingModule } from './billing-routing.module';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { MyPaymentComponent } from './pages/my-Payment/my-Payment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AccoutPaymentComponent,
    InvoiceComponent,
    MyPaymentComponent,
    InvoiceComponent,
    MyPaymentComponent
  ],
  imports: [
    CommonModule,
    BillingRoutingModule,
    InputNumberModule,
    CheckboxModule,
    DropdownModule,
    OverlayPanelModule,
    FormsModule,
    OverlayPanelModule,
    FormsModule
  ]
})
export class BillingModule { }
