import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceService } from 'src/app/shared/services/base/resource.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceItemService extends ResourceService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/warehouse';
  }
}
