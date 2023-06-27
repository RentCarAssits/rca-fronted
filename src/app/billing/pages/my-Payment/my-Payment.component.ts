import { Component, OnInit } from '@angular/core';
import { AccountPayableService } from '../../services/account-payable/account-payable.service';
import { CarService } from 'src/app/renting/services/car/car.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AccountPayable {
  // Define la estructura de los datos de cuenta por pagar
  // Asegúrate de ajustar los tipos de datos según tu caso
  id: number;
  payerId: number;
  payeeId: number;
  totalPrice: number;
  parcialPrice: number;
  expirationDay: string;
  currency:string;
  serviceId:number
  state: string;
}

interface AccountPayablesResponse {
  result: AccountPayable[];
  errors: any[];
}
interface CarsData{
  id:number;
  brand:string;
  integrity:string;
  model:string;
  name:string;
  image:string;
  ownerId:Number;
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
  accountPayables: AccountPayablesResponse = { result: [], errors: [] };
  car: any;
  carLoaded: boolean = false;
  constructor(private accountPayableService: AccountPayableService, private carService:CarService) {}

  async ngOnInit() {
    try {
      await this.getAccountPayablesForUserId();
      this.getCarById();
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
        (response: AccountPayablesResponse) => {
          const data = response.result; // Obtén el array de datos de la respuesta
          this.accountPayables.result = data.filter(
            (item) => item.payerId === userId
          );
          resolve(); // Resuelve la Promesa una vez que se haya filtrado el resultado correctamente
        },
        (error) => {
          console.error(error);
          reject(error); // Rechaza la Promesa si se produce un error en la llamada al servicio
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

getCarById() {
    const id = this.accountPayables.result[0]?.serviceId;
    this.carService.getById(id).subscribe(
      (response) => {
        const data = response.result;
        this.car=data;
        console.log()
      },
      (error) => {
        console.error(error);
        // Handle the error here
      }
    );

}

deleteAccountById(){
  const id = this.accountPayables.result[0]?.id;
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
}
