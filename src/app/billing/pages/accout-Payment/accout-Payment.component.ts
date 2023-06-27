import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountPayableService } from '../../services/account-payable/account-payable.service';
import { CarService } from 'src/app/renting/services/car/car.service';
import { MessageService } from 'primeng/api';
import { UrlTree } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
declare var paypal: any;

@Component({
  selector: 'app-accout-Payment',
  templateUrl: './accout-Payment.component.html',
  styleUrls: ['./accout-Payment.component.css']
})
export class AccoutPaymentComponent implements OnInit {
  paymentData: any;
  result: any;
  accountPayables: any;
  car: any;
  shippingForm: FormGroup ;
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
    private messageService:MessageService
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

  async getCarById() {
    try {
      const id = this.accountPayables?.serviceId;
      const response = await this.carService.getById(id).toPromise();
      const data = response.result;
      this.car = data;
      console.log(this.car);
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
        console.log('Orden aprobada, iniciando captura...');  // Mensaje de depuración adicional
        return actions.order.capture().then((details: any) => {
          console.log('Captura completada, detalles:', details);  // Este es el mensaje original que no estás viendo
          // Mostrar un mensaje de éxito al usuario
          this.messageService.add({severity:'success', summary:'Pago realizado con éxito', detail:'Transacción completada por ' + details.payer.name.given_name + '!'});

          // Redirigir al usuario a una página de agradecimiento después de un breve retraso
         /* setTimeout(() => {
            const url: UrlTree = this.router.createUrlTree(['renting', 'dashboard']);
            this.router.navigateByUrl(url);
          }, 2000);  // 2000 ms = 2 segundos*/
        }).catch((error: any) => {
          console.error('Error durante la captura:', error);  // Nuevo mensaje de depuración para capturar errores
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
}
