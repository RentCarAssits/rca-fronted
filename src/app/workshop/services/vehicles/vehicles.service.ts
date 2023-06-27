import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {ResourceService} from "../../../shared/services/base/resource.service";

@Injectable({
  providedIn: 'root'
})
export class VehiclesService extends ResourceService<any>{


  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/vehicles';
  }

  getVehiclesInMaintenanceState(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/state/maintenance`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
