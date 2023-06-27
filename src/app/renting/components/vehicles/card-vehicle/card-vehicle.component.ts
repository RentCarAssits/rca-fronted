import {Component, Input, OnInit} from '@angular/core';
import {DataServiceService} from "../../../services/data/data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-vehicle',
  templateUrl: './card-vehicle.component.html',
  styleUrls: ['./card-vehicle.component.css']
})
export class CardVehicleComponent implements OnInit {
  @Input() vehicle: any;
  constructor(private dataService: DataServiceService, private router: Router) {
  }
  ngOnInit(): void {
    if (!this.vehicle.image) {
      this.router.navigate(['renting/vehicles-catalog']);
    }
  }

  getCurrency(currency: string) {
    switch (currency) {
      case 'USD':
        return '$'
      case 'SOL':
        return 'S/.'
      case 'EURO':
        return '€'
      default:
        return '$'
    }
  }

  requestVehicle(car: any) {
    //console.log('vehicle: ', car);
    this.dataService.changeVehicleId(car);
    this.router.navigate(['renting/car-info-request']);

  }
}
