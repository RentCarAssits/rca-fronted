import { Injectable } from '@angular/core';
import {ResourceService} from "../../../shared/services/base/resource.service";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {RentingOrderItem} from "../../models/renting-order-item";

@Injectable({
  providedIn: 'root'
})
export class RentingOrderItemsService extends ResourceService<RentingOrderItem>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath+='/Renting-Order-Items';
  }
  getByVehiclesId(vehiclesId:number[]):Observable<any>{
    const body = { vehiclesId: vehiclesId };
    const jsonBody = JSON.stringify(body);
    //console.log(jsonBody);
    return this.http.post<any>(`${this.basePath}/get-by-vehicles`, jsonBody,this.httpOptions);
  }
  updateRentingItemStateId(rentingId:number,state:string):Observable<any>{
    const body = { id: rentingId,state:state };
    const jsonBody = JSON.stringify(body);
    //console.log(jsonBody);
    return this.http.put<any>(`${this.basePath}/${rentingId}`, jsonBody,this.httpOptions);
  }


  getRentingOrderItemsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/get-by-renter-id/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getAcceptedRentingOrderItemsByUserId(userId: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/get-all-accepted-by-renter-id/${userId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  override getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/${id}`,this.httpOptions);
  }
}
