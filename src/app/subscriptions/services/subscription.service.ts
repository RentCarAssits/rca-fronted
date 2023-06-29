import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base/base.service";
import { RegisterSubscription } from "../model/registerSubscription";
import {ResourceService} from "../../shared/services/base/resource.service";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends ResourceService<any>{

    constructor(http: HttpClient){
        super(http);
        this.basePath += '/Subscriptions';
    }
}
