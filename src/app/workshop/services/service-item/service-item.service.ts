import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";
import {ResourceService} from "../../../shared/services/base/resource.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceItemService extends ResourceService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/proposal'
  }

  getAllServiceItemByProposal(proposalId: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/${proposalId}/serviceItems`).pipe(retry(2), catchError(this.handleError));

  }

  getAllRequestItems(proposalId: any, serviceItemId: any) {
    return this.http.get<any>(`${this.basePath}/${proposalId}/serviceItem/${serviceItemId}/requestItems`).pipe(retry(2), catchError(this.handleError));
  }
}
