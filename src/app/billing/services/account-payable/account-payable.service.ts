import { Injectable } from '@angular/core';
import {ResourceService} from "../../../shared/services/base/resource.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountPayableService extends ResourceService<any> {

  constructor(http:HttpClient) {
    super(http);
    this.basePath += '/accountPayable';
  }
  getAllAccountPayables() {
    return this.getAll();
  }
}
