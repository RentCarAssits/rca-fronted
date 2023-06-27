import { Injectable } from '@angular/core';
import {ResourceService} from "../../../shared/services/base/resource.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RentingOrderService extends ResourceService<any> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath+='/rent-order';
  }

  getFullInfoRentOrderByOwner(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/by/owner`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getFullInfoRentOrderByRenter(): Observable<any> {
    return this.http.get<any>(`${this.basePath}/by/renter`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

}
