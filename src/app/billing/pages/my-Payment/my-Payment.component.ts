import { Component, OnInit } from '@angular/core';
import { AccountPayableService } from '../../services/account-payable/account-payable.service';

interface AccountPayable {
  // Define la estructura de los datos de cuenta por pagar
  // Asegúrate de ajustar los tipos de datos según tu caso
  id: number;
  payerId: number;
  payeeId: number;
  totalPrice: number;
  parcialPrice: number;
  expirationDay: string;
  state: number;
}

interface AccountPayablesResponse {
  result: AccountPayable[];
  errors: any[];
}

@Component({
  selector: 'app-my-Payment',
  templateUrl: './my-Payment.component.html',
  styleUrls: ['./my-Payment.component.css']
})
export class MyPaymentComponent implements OnInit {
  accountPayables: AccountPayablesResponse = { result: [], errors: [] };
  constructor(private accountPayableService: AccountPayableService) {}

  ngOnInit() {
    this.getAccountPayablesForUserId();
  }

  getAccountPayablesForUserId() {
    const currentUserString = localStorage.getItem('currentUser');
    let userId: number | null = null;
    if (currentUserString !== null) {
      const currentUser = JSON.parse(currentUserString);
      userId = currentUser.id;
    } else {
      console.log('No logged in user found');
      return;
    }
    this.accountPayableService.getAllAccountPayables().subscribe(
      (response: AccountPayablesResponse) => {
        const data = response.result; // Obtén el array de datos de la respuesta
        this.accountPayables.result = data.filter(
          (item) => item.payerId === userId
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  filterPayments(event: any) {
    const filterValue = event.target.value;
    const filteredResults = this.accountPayables?.result?.filter((item: any) =>
      item.totalPrice.toString().includes(filterValue)
    );
    this.accountPayables.result = filteredResults;
  }
}
