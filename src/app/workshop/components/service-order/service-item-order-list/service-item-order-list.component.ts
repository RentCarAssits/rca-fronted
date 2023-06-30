import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../iam/services/auth.service";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {ServiceOrderService} from "../../../services/service-order/service-order.service";
import {CarService} from "../../../../renting/services/car/car.service";
import {
  SelectedRentingOrderItemDialogComponent
} from "../../../../renting/components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {ServiceItemListComponent} from "../../proposal/service-item-list/service-item-list.component";

@Component({
  selector: 'app-service-item-order-list',
  templateUrl: './service-item-order-list.component.html',
  styleUrls: ['./service-item-order-list.component.css']
})
export class ServiceItemOrderListComponent {
  user:any;
  serviceItemOrders!: any;
  diagnosticAux!: any
  selectedItem: any;
  vehicle: any;
  diagnosticItem: any;
  orderId: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private http: HttpClient,private authService:AuthService,
              private dialogService: DialogService,
              private serviceOrderService:ServiceOrderService,
              private carService: CarService,
              private config: DynamicDialogConfig,
  ) {
    this.orderId = this.config.data.orderId
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log("user as",this.user)
    this.getProposal(this.orderId);

  }
  getProposal(orderId: number) {
    this.serviceOrderService.getAllServiceItemByOrder(orderId).subscribe(response => {
      this.serviceItemOrders = response.result

    })
  }

  getCircleClass(state: string): string {
    if (state === 'D') {
      return 'bg-red-100';
    } else if (state === 'O') {
      return 'bg-orange-100';
    } else if (state === 'A') {
      return 'bg-green-100';
    } else if (state === 'R') {
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
