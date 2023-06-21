import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccoutPaymentComponent } from './pages/accout-Payment/accout-Payment.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';


const routes: Routes=[
  { path: '', redirectTo: '', pathMatch: 'full' },
  {path: 'car-info-request/checkout', component: AccoutPaymentComponent},
  {path: 'car-info-request/invoice', component: InvoiceComponent}
]
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class BillingRoutingModule { }
