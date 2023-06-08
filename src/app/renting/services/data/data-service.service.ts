import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private vehicleSource = new BehaviorSubject<any>({});
  currentVehicleId = this.vehicleSource.asObservable();
  DataServiceService() { }

  changeVehicleId(car: any) {

    this.vehicleSource.next(car);
  }
  constructor() { }
}
