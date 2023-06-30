import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { ResourceService } from 'src/app/shared/services/base/resource.service';

@Injectable({
  providedIn: 'root',
})
export class ProposalService extends ResourceService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/proposal';
  }

  getProposals() {
    return this.http
      .get<any>(`${this.basePath}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  createProposal(item: any): Observable<any> {
    const jsonBody = JSON.stringify(item);
    return this.http.post<any>(this.basePath, jsonBody, this.httpOptions);
  }

  getServiceItems(proposalId: any) {
    return this.http
      .get<any>(`${this.basePath}/${proposalId}/serviceItem`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getFullByOwner(ownerId:number): Observable<any> {
    return this.http.get<any>(`${this.basePath}/owner/${ownerId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  getFullByMechanic(mechanicId:number): Observable<any> {
    return this.http.get<any>(`${this.basePath}/mechanic/${mechanicId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  accept(proposalId: number): Observable<any> {
    return this.http.post<any>(`${this.basePath}/${proposalId}/accept`, this.httpOptions)
  }
  
  createServiceItem(proposalId: any, item: any): Observable<any> {
    const jsonBody = JSON.stringify(item);
    return this.http.post<any>(
      `${this.basePath}/${proposalId}/serviceItem`,
      jsonBody,
      this.httpOptions
    );
    
  }
}
