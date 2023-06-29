import {Injectable} from '@angular/core';
import {ResourceService} from "../../shared/services/base/resource.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TwilioService extends ResourceService<any>{
  constructor(http: HttpClient) {
    super(http);
    this.basePath+='/twilio';
  }



}
