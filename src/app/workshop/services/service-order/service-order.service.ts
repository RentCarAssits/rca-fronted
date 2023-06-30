import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {ResourceService} from "../../../shared/services/base/resource.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService extends ResourceService<any>{
  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/serviceOrder'
  }

  getAllServiceItemByOrder(orderId: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/${orderId}/serviceItemOrders`).pipe(retry(2), catchError(this.handleError));

  }

  getInventories(warehouseId: any) {
    return this.http.get<any>(`${this.basePath}/${warehouseId}/inventory`).pipe(retry(2), catchError(this.handleError));
  }
}
