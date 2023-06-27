import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-maintenance-vehicle-card',
  templateUrl: './maintenance-vehicle-card.component.html',
  styleUrls: ['./maintenance-vehicle-card.component.css']
})
export class MaintenanceVehicleCardComponent implements OnInit {
  @Input() vehicle: any;

  constructor() {
  }

  ngOnInit() {
    console.log(this.vehicle);
  }
}
