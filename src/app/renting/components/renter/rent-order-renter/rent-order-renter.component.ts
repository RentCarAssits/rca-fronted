import {Component, OnInit} from '@angular/core';
import {RentingOrderService} from "../../../services/renting-orders/renting-order.service";

@Component({
  selector: 'app-rent-order-renter',
  templateUrl: './rent-order-renter.component.html',
  styleUrls: ['./rent-order-renter.component.css']
})
export class RentOrderRenterComponent implements OnInit{
  rentOrder!: any[];

  constructor(private rentOrderService: RentingOrderService) {
  }

  ngOnInit(): void {
    this.getRentOrders()
  }

  getRentOrders() {
    this.rentOrderService.getFullInfoRentOrderByRenter().subscribe(
      {
        next: (response) => {
          this.rentOrder = response.result
          console.log('response Rent Order Owner: ', response.result);
        },
        error: (err) => {
          console.log(' rent Order Error: ', err);
        }
      }
    )

  }


  getCarStateCode(state: string): string {
    switch (state) {
      case 'IN_PROGRESS':
        return 'IN PROGRESS';
      case 'COMPLETED':
        return 'COMPLETED';
      default:
        return '';
    }
  }
  getCarStateClass(state: string): string {
    switch (state) {
      case 'IN_PROGRESS':
        return "customer-badge status-renewal";
      case 'COMPLETED':
        return "customer-badge status-new";
      default:
        return '';
    }
  }

}
