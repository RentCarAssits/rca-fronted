import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../../services/car/car.service";

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit{

  ownerCars: any[] = [];

  constructor(private http: HttpClient, private service: CarService) {
  }

  ngOnInit(): void {
    this.getVehiclesByOwner()
  }

  getVehiclesByOwner() {
    this.service.getLastYearVehicles().subscribe((response: any) => {
      this.ownerCars = response.result;
      console.log('ownerCars: ', this.ownerCars)
    }, (error) => {
      console.log(error)
    });
  }




}
