import {Component, OnInit} from '@angular/core';

import {VehiclesService} from "../../services/vehicles/vehicles.service";

@Component({
  selector: 'app-maintenance-vehicles',
  templateUrl: './maintenance-vehicles.component.html',
  styleUrls: ['./maintenance-vehicles.component.css']
})
export class MaintenanceVehiclesComponent implements OnInit {

  maintenanceVehicles: any = []

  constructor(private vehiclesService: VehiclesService) {
  }

  ngOnInit(): void {
    this.getMaintenanceVehicles()
  }

  getMaintenanceVehicles() {
    this.vehiclesService.getVehiclesInMaintenanceState().subscribe({
      next: response => {
        this.maintenanceVehicles = response.result
      },
      error: err => {
        console.log(err);
      },
    })
  }


}
