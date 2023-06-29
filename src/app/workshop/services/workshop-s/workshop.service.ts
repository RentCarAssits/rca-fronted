import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry } from 'rxjs';
import { ResourceService } from 'src/app/shared/services/base/resource.service';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService extends ResourceService<any> {

  constructor(http: HttpClient) { 
    super(http);
    this.basePath += '/workshop'
  }

  createWorkshop(item: any): Observable<any> {
    const jsonBody = JSON.stringify(item)
    console.log(jsonBody);
    return this.http.post<any>(this.basePath, jsonBody, this.httpOptions)
  }

  getAllWorkshops(mechanicId: any): Observable<any> {
    return this.http.get<any>(`${this.basePath}/mechanic/${mechanicId}`, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }  
}
