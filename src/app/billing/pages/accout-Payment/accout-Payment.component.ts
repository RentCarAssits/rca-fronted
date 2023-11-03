import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountPayableService} from '../../services/account-payable/account-payable.service';
import {CarService} from 'src/app/renting/services/car/car.service';
import {MessageService} from 'primeng/api';
import {UrlTree} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {RentingOrderService} from "../../../renting/services/renting-orders/renting-order.service";
import {RentingOrderItemsService} from "../../../renting/services/renting-items/renting-order-items.service";
import {AuthService} from "../../../iam/services/auth.service";
import { InvoiceService } from '../../services/invoice/invoice.service';
import { DatePipe } from '@angular/common';

declare var paypal: any;

@Component({
  selector: 'app-accout-Payment',
  templateUrl: './accout-Payment.component.html',
  styleUrls: ['./accout-Payment.component.css']
})
export class AccoutPaymentComponent implements OnInit {
  paymentData: any;
  rentingItem: any;
  result: any;
  accountPayables: any;
  car: any;
  shippingForm: FormGroup;

  private loadPaypalScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://www.paypal.com/sdk/js?client-id=AURR1Bo6su6uaQLVRVwLRkxownm1PWnC1CaaLK9V3S2yz0-RiqLOqKS2LYDLzDezGqLvEutMQJMp2iHB';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountPayableService,
    private carService: CarService,
    private messageService: MessageService,
    private orderService: RentingOrderService,
    private rentingOrderItemsService: RentingOrderItemsService,
    private authService: AuthService,
    private rentOrderService: RentingOrderService,
    private invoiceService:InvoiceService,
    private datePipe:DatePipe
  ) {
    this.shippingForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'name': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'pc': new FormControl(null, Validators.required),
      'city': new FormControl(null, Validators.required),
    });
  }

  async ngOnInit() {
    await this.getAccountById();
    await this.getRentingItemById();
    this.createOrder(1)
    await this.getCarById();
    this.loadPaypalScript().then(() => {
      this.initPayPalButton();
    });


  }

  async getAccountById() {
    try {
      const id = this.route.snapshot.paramMap.get('paymentId');
      console.log(id);
      const response = await this.accountService.getById(id).toPromise();
      const data = response.result;
      this.accountPayables = data;
      console.log(data);
    } catch (error) {
      console.error('Error al obtener el ID:', error);
    }
  }

  async getRentingItemById() {
    try {
      const id = this.accountPayables?.serviceId;
      const response = await this.rentingOrderItemsService.getById(id).toPromise()
      this.rentingItem = response.result

    } catch (e) {
      console.log(e);
    }
  }

  async getCarById() {
    try {
      const response = await this.carService.getById(this.rentingItem?.vehicleId).toPromise();
      this.car = response.result;
      console.log('asfas', this.car);
    } catch (error) {
      console.error(error);
      // Handle the error here
    }
  }

  initPayPalButton() {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: this.accountPayables?.currency,
                // Aquí usamos el valor dinámico
                value: this.accountPayables?.totalPrice.toString()
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        console.log('Orden aprobada, iniciando captura...');
        return actions.order.capture().then((details: any) => {
          const addressLine1 = details.purchase_units[0].shipping.address.address_line_1;
          console.log('Captura completada, detalles:', addressLine1);

          this.createOrder(this.rentingItem.id)
          this.messageService.add({
            severity: 'success',
            summary: 'Pago realizado con éxito',
            detail: 'Transacción completada por ' + details.payer.name.given_name + '!'
          });


          setTimeout(() => {
            this.updateRenting();
           this.createInvoice(addressLine1);
          }, 2000);  // 2000 ms = 2 segundos/
        }).catch((error: any) => {
          console.error('Error durante la captura:', error);
        });
      },
      onCancel: (data: any) => {
        console.log('Pago cancelado:', data);
      },
      onError: (err: any) => {
        console.error('Error de PayPal:', err);
      }
    }).render('#paypal-button-container');
  }

  createOrder(id:any) {
    const user:any = this.authService.getCurrentUser()
    const body = {state: 0, renterId: user.id, itemIds: [id]};
    this.rentOrderService.create(body).subscribe(response => {
      console.log(response);

    }, err => {
      console.error('Error:', err);
    });

  }

  createInvoice(addressLine1:any){
    const user:any = this.authService.getCurrentUser()
    const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const body = {
      payerId:user.id,
      date:currentDate,
      payerAddress: [addressLine1],
      serviceId: this.rentingItem?.id,
      totalPrice: this.accountPayables?.totalPrice
    };
    this.invoiceService.create(body).subscribe(
      createResponse => {
        console.log(createResponse);
        const invoiceId = createResponse.result.invoiceId;
        const url: UrlTree = this.router.createUrlTree(['billing', 'car-info-request', 'invoice', invoiceId ]);
        this.router.navigateByUrl(url);
      },
      createError => {
        console.error('Error:', createError);
      }
    );
  }

  updateRenting(){
    const id = this.route.snapshot.paramMap.get('paymentId');
    const date = this.formatDate(this.accountPayables?.expirationDay);
    const body= {
      payerId: this.accountPayables?.payerId,
      payeeId:this.accountPayables?.payeeId,
      serviceId: this.accountPayables?.serviceId,
      totalPrice:this.accountPayables?.totalPrice,
      parcialPrice: this.accountPayables?.parcialPrice,
      state: 'CONFIRMED',
      expirationDay:date,
      currency: this.accountPayables?.currency,
      tipoServicio: this.accountPayables?.tipoServicio,
    }
    this.accountService.update(id,body).subscribe(
      response => {
        console.log("actualizado"+response)
      }
    )
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${year}/${month}/${day}`;
  }
}
