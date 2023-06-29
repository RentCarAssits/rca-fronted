import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PlanService } from '../services/plan.service';
import { plansResponse } from '../model/plans.model';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { SubscriptionService } from '../services/subscription.service';
import { RegisterSubscription } from '../model/registerSubscription';
import { currentPlanResponse } from '../model/currentPlanUser';
import { AuthService } from 'src/app/iam/services/auth.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent {
  plan!:any; 
  subscription!: any;
  plans!: plansResponse[];
  currentPlan!: currentPlanResponse;
  currentuser:any;
  // bollean by marx
  currentPlanBool: boolean = false;
  userRole:any;
  constructor(private planService:PlanService, private authService:AuthService){
    this.plan = planService;
  }

  ngOnInit(){
    this.getAllPlans();
    this.getCurrentPlan()
    this.initChart();
  }

  ngOnDestroy(){ }
  initChart(){}

  getCurrenUserId(){
    let user = this.authService.getCurrentUser();
    this.currentuser = user?.id;
    this.userRole=user?.roles;
    console.log("USER ID: ",user);
    console.log("USER ID: ",this.currentuser);
  }

  getCurrentPlan(){
    this.planService.getCurrentPlanByUser(this.currentuser).subscribe(
      (Response:any)=>{
        this.currentPlanBool = true;
        this.currentPlan = Response.result;
        if(this.currentPlan == null){
          this.currentPlanBool = false;
        }
      },(error)=>{
        this.currentPlanBool = false;
        console.log("No se pudo mi rey");
        
      }
    )
  }

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

 
  getFunction(){
    window.alert("");
  }

}