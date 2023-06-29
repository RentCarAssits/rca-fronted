import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceService } from 'src/app/shared/services/base/resource.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends ResourceService<any> {

  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/warehouse'
   }

   createWarehouse(item: any): Observable<any> {
    const jsonBody = JSON.stringify(item)
    return this.http.post<any>(this.basePath, jsonBody, this.httpOptions)
   }


}
