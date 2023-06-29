import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/shared/services/base/resource.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService  extends ResourceService<any> {

  constructor(http:HttpClient) {
    super(http);
    this.basePath += '/invoice';
  }

}
