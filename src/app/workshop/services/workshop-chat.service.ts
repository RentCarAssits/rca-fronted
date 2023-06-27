import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ResourceService} from "../../shared/services/base/resource.service";
@Injectable({
  providedIn: 'root'
})
export class WorkshopChatService extends  ResourceService<any>{

  constructor(http: HttpClient) {
    super(http);
    this.basePath += '/chat';
  }

  sendMessage(message: string) {
    return this.http.post(this.basePath, { prompt: message });
  }
}
