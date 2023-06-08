import { Component } from '@angular/core';
import {DataServiceService} from "../../services/data/data-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {
  car: any;

  constructor(private data: DataServiceService, private router:Router) { }

  ngOnInit() {
    this.data.currentVehicleId.subscribe(car => this.car = car);
    if(!this.car.image){
      this.router.navigate(['renting/dashboard']);
    }
    console.log('aqui :', this.car)
  }


}
