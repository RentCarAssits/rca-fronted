import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../../services/car/car.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DialogService} from "primeng/dynamicdialog";
import {RefDialogServiceService} from "../../../../iam/services/ref-dialog-service.service";
import {BaseService} from "../../../../shared/services/base/base.service";
import {AuthService} from "../../../../iam/services/auth.service";
import {
  SelectedRentingOrderItemDialogComponent
} from "../selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {RentingOrderItemsService} from "../../../services/renting-items/renting-order-items.service";

@Component({
  selector: 'app-renting-order-history',
  templateUrl: './renting-order-history.component.html',
  styleUrls: ['./renting-order-history.component.css']
})
export class RentingOrderHistoryComponent {
  user:any;
  rentingOrderItems!: any[];
  selectedItem: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private http: HttpClient,private authService:AuthService,
              private dialogService: DialogService,
              private rentingItemOrderService:RentingOrderItemsService
  ) {
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log("user as",this.user)
    this.getRentingOrderItemsByUserId(this.user.id);

  }
  getRentingOrderItemsByUserId(userId: number) {
    this.rentingItemOrderService.getRentingOrderItemsByUserId(userId).subscribe(response => {
      this.rentingOrderItems = response.result
      console.log(response)
    })
  }

  getCircleClass(state: string): string {
    if (state === 'D') {
      return 'bg-red-100';
    } else if (state === 'O') {
      return 'bg-orange-100';
    } else if (state === 'A') {
      return 'bg-green-100';
    }
    return '';
  }

  getIconClass(state: string): string {
    if (state === 'D') {
      return 'pi pi-dot text-red-500';
    } else if (state === 'O') {
      return 'pi pi-dot text-orange-500';
    } else if (state === 'A') {
      return 'pi pi-dot text-green-500';
    }
    return '';
  }
  showItemDialog(item: any) {
    //console.log(item);
    this.selectedItem = item;
    this.dialogService.open(SelectedRentingOrderItemDialogComponent, {
      header: 'Request Details',
      width: '500px',
      contentStyle: {'max-height': '500px', overflow: 'auto'},
      data: {item},
    });
  }
}
