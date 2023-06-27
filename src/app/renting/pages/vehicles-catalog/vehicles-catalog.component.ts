import {Component, OnInit} from '@angular/core';
import {CarService} from "../../services/car/car.service";

@Component({
  selector: 'app-vehicles-catalog',
  templateUrl: './vehicles-catalog.component.html',
  styleUrls: ['./vehicles-catalog.component.css']
})
export class VehiclesCatalogComponent implements OnInit {
  vehicles: any[] = []

  constructor(private service: CarService) {
  }

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles() {
    this.service.getAll().subscribe({
      next: response => {
        this.vehicles = response.result
      },
      error: err => {
        console.log(err);

      }
    })
  }
}
