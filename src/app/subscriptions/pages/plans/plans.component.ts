import {Component, OnInit} from '@angular/core';
import {plansResponse} from "../../model/plans.model";
import {PlanService} from "../../services/plan.service";
import {AuthService} from "../../../iam/services/auth.service";
import {Router} from "@angular/router";
import {SubscriptionService} from "../../services/subscription.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {


  plans!: plansResponse[]

  hasAnPlan!: Boolean

  constructor(private planService: PlanService,
              private authService: AuthService,
              private router: Router,
              private subscriptionService: SubscriptionService
  ) {
  }

  ngOnInit(): void {
    this.getCurrentPlan()
    this.getAllPlans()
  }

  getAllPlans() {
    this.planService.getAllPlans().subscribe(
      (response: any) => {
        this.plans = response.result
        console.log(this.plans);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  createPlan(plan: any, planId: number) {
    if (this.hasAnPlan) {
      const user: any = this.authService.getCurrentUser()
      const payload = {
        AccountId: user.account.id,
        PlanId: (planId + 1),
        UnitPrice: plan.Price,
        Frequency: 'MENSUAL',
        startDate: new Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date()),
        endDate: new Intl.DateTimeFormat('en-CA', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date()),
        discount: 0
      }

      this.subscriptionService.create(payload).subscribe({
        next: (response) => {
        },
        error: (err) => {
          console.log(err.message)
        },
        complete: () => {
        }
      })
    }
  }

  getCurrentPlan() {
    const user: any = this.authService.getCurrentUser()
    this.planService.getCurrentPlanByUser(user.id).subscribe(
      (Response: any) => {
        console.log(Response);
        this.hasAnPlan = true
      }, (error) => {
        this.hasAnPlan = false
      }
    )
  }
}
