import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base/base.service";
import { RegisterSubscription } from "../model/registerSubscription";

export class SubscriptionService extends BaseService{
    constructor(http: HttpClient){
        super(http);
        this.basePath += '/Subscription';
    }

    createSubscription(SubscriptionData: RegisterSubscription): Observable<any> {
        const url = this.basePath; // URL para el endpoint de creación de suscripción
        return this.http.post(url, SubscriptionData);
    }
    
}