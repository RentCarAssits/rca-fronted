import {Component, OnInit} from '@angular/core';
import {RentingOrderService} from "../../../services/renting-orders/renting-order.service";

@Component({
  selector: 'app-rent-order-owner',
  templateUrl: './rent-order-owner.component.html',
  styleUrls: ['./rent-order-owner.component.css']
})
export class RentOrderOwnerComponent implements OnInit {

  rentOrder!: any[];

  constructor(private rentOrderService: RentingOrderService) {
  }

  ngOnInit(): void {
    this.getRentOrders()
  }

  getRentOrders() {
    this.rentOrderService.getFullInfoRentOrderByOwner().subscribe(
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
