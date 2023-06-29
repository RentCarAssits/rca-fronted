import {Component, OnInit} from '@angular/core';
import {AccountPayableService} from '../../services/account-payable/account-payable.service';
import {CarService} from 'src/app/renting/services/car/car.service';
import {catchError, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {RentingOrderService} from "../../../renting/services/renting-orders/renting-order.service";
import {RentingOrderItem} from "../../../renting/models/renting-order-item";
import {RentingOrderItemsService} from "../../../renting/services/renting-items/renting-order-items.service";
import { UrlTree , Router} from '@angular/router';

interface AccountPayable {
  id: number;
  payerId: number;
  payeeId: number;
  totalPrice: number;
  parcialPrice: number;
  expirationDay: string;
  currency: string;
  serviceId: number
  state: string;
}

interface AccountPayablesResponse {
  result: AccountPayable[];
  errors: any[];
}

interface CarsData {
  id: number;
  brand: string;
  integrity: string;
  model: string;
  name: string;
  image: string;
  ownerId: Number;
}

interface CarsResponse {
  result: CarsData[];
  errors: any[];
}


@Component({
  selector: 'app-my-Payment',
  templateUrl: './my-Payment.component.html',
  styleUrls: ['./my-Payment.component.css']
})
export class MyPaymentComponent implements OnInit {
  accountPayables: AccountPayablesResponse = {result: [], errors: []};
  car: any;
  carLoaded: boolean = false;
  cars: any[] = []
  rentingItems: any[] = []

  constructor(private accountPayableService: AccountPayableService,
              private carService: CarService,
              private rentingOrderItemsService: RentingOrderItemsService,
              private router:Router
  ) {
  }

  async ngOnInit() {
    try {
      await this.getAccountPayablesForUserId();
    } catch (error) {
      // Manejar el error si es necesario
    }
  }


  async getAccountPayablesForUserId(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const currentUserString = localStorage.getItem('currentUser');
      let userId: number | null = null;
      if (currentUserString !== null) {
        const currentUser = JSON.parse(currentUserString);
        userId = currentUser.id;
      } else {
        console.log('No se encontró ningún usuario conectado');
        reject('No se encontró ningún usuario conectado');
        return;
      }

      this.accountPayableService.getAllAccountPayables().subscribe(
        async (response: AccountPayablesResponse) => {  // Mark the callback function as async
          const data = response.result;

          this.accountPayables.result = data.filter(
            (item) => item.payerId === userId
          );

          const itemsId = this.accountPayables.result.map(a => a.serviceId);

          for (const i of itemsId) {  // Process each item sequentially
            try {
              const response = await this.rentingOrderItemsService.getById(i).toPromise();
              this.rentingItems.push(response.result);
            } catch (err) {
              console.log(err);
            }
          }

          for (const item of this.rentingItems) {
            try {
              const response = await this.carService.getById(item.vehicleId).toPromise();
              this.cars.push(response.result);

            } catch (err) {
              console.log(err);
            }
          }

          console.log(this.cars);  // All cars have been fetched at this point
          resolve();
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  filterPayments(event: any) {
    const filterValue = event.target.value;
    const filteredResults = this.accountPayables?.result?.filter((item: any) =>
      item.totalPrice.toString().includes(filterValue)
    );
    this.accountPayables.result = filteredResults;
  }


  deleteAccountById(id: number) {
    this.accountPayableService.delete(id)
      .pipe(
        tap(() => {
          window.location.reload();
          console.log('Elemento eliminado');
        }),
        catchError((error) => {
          console.error('Error al eliminar el elemento:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  goToInvoice(id:number){
    const paymentId=id
    const url: UrlTree = this.router.createUrlTree(['billing', 'car-info-request', 'checkout', paymentId]);
    this.router.navigateByUrl(url);
  }
}
