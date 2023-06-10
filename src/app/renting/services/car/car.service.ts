import { Injectable } from '@angular/core';
import {ResourceService} from "../../../shared/services/base/resource.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CarService extends ResourceService<any>{
  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/vehicles';
  }

  getLastYearVehicles(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/latest/vehicles`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getVehiclesByMostStars(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/stars/vehicles`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  get20VehicleRandom(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/random/vehicles`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getVehicleByOwner(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/by/owner`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }






}
