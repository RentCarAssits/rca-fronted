import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {ResourceService} from "../../shared/services/base/resource.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService extends ResourceService<any>{
  constructor(http: HttpClient) {
    super(http);
    this.basePath+='/serviceRequest';
  }

  getFullByOwner(ownerId:number): Observable<any> {
    return this.http.get<any>(`${this.basePath}/owner/${ownerId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  createServiceRequest(): Observable<any> {
    return this.http.post<any>(`${this.basePath}/by/renter`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
