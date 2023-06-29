import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseService } from "src/app/shared/services/base/base.service";
@Injectable({
    providedIn: 'root'
})
export class PlanService extends BaseService{
    constructor(http: HttpClient){
        super(http);
        this.basePath += '/Plans';
    }

    getAllPlans(): Observable<any> {
        const url = 'http://localhost:8080/api/v1/Plans';
        return this.http.get(url);
    }

    getCurrentPlanByUser(userId: number): Observable<any> {
        const url = `http://localhost:8080/api/v1/Plans/By/${userId}`;
        return this.http.get(url);
    }
      
}