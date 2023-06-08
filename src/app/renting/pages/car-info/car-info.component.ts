import { Component } from '@angular/core';
import {DataServiceService} from "../../services/data/data-service.service";

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {
  vehicle: any;

  constructor(private data: DataServiceService) { }

  ngOnInit() {
    this.data.currentVehicleId.subscribe(vehicle => this.vehicle = vehicle);
    console.log('aqui :', this.vehicle)
  }


}
