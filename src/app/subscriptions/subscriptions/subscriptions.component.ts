import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanService } from '../services/plan.service';
import { plansResponse } from '../model/plans.model';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { SubscriptionService } from '../services/subscription.service';
import { RegisterSubscription } from '../model/registerSubscription';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  plan!:any; 
  subscription!: any;
  plans!: plansResponse[];

  constructor(private planService:PlanService){
    this.plan = planService;
  }

  ngOnInit(){
    this.getAllPlans();
    this.initChart();
  }
  ngOnDestroy(){ }
  initChart(){}
  getAllPlans(){
    this.planService.getAllPlans().subscribe(
      (response:any)=>{
        this.plans = response.result
        console.log(this.plans);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  /*postNewSubscription(){
    const currentDate: Date = new Date();
    const subscriptionData: RegisterSubscription = {
      AccountId: 1,
      PlanId: 1,
      UnitPrice: 250,
      Frequency: 'Mensual',
      startDate: currentDate,
      endDate: currentDate,
    };

    this.subscriptionService.createSubscription(subscriptionData).subscribe(Response=>{
      window.alert("Success");
    },error=>{
      window.alert("ERROR");
    });
  }*/
 
 
  getFunction(){
    window.alert("");
  }

}