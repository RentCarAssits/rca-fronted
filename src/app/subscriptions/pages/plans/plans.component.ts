import {Component, OnInit} from '@angular/core';
import {plansResponse} from "../../model/plans.model";
import {PlanService} from "../../services/plan.service";
import {AuthService} from "../../../iam/services/auth.service";
import {Router} from "@angular/router";
import {SubscriptionService} from "../../services/subscription.service";
import {MessageService} from "primeng/api";

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
              private subscriptionService: SubscriptionService,
              private message: MessageService,
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
        this.plans = this.plans.filter(plan => plan.PlanName != 'Basic')
        console.log(this.plans);
      },
      (error) => {
        console.log(error);
      }
    )
  }


  async createPlan(plan: any, planId: number) {
    const user: any = this.authService.getCurrentUser()
    const payload = {
      AccountId: user.account.id,
      PlanId: (planId + 2),
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
        this.showSuccess();
      },
      error: (err) => {
        console.log(err.message)
      },
      complete: () => {
        setTimeout(() => {
          this.router.navigate(['/renting/Subscriptions/subscription-section'])
        }, 1000)

      }
    })

  }

  getCurrentPlan() {
    const user: any = this.authService.getCurrentUser()
    this.planService.getCurrentPlanByUser(user.id).subscribe(
      (response: any) => {
        if (response.result?.name ) this.router.navigate(['/renting/Subscriptions/subscription-section'])
      }, (error) => {
        console.log(error);
      }
    )
  }

  showSuccess() {
    this.message.add({severity: 'success', summary: 'Success', detail: 'Operation completed successfully'});
  }

  showError() {
    this.message.add({severity: 'success', summary: 'Success', detail: 'Operation not completed tryAgain'});
  }
}
