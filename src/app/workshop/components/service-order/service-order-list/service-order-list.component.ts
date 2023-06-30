import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../iam/services/auth.service";
import {DialogService} from "primeng/dynamicdialog";
import {ProposalService} from "../../../services/proposal/proposal.service";
import {CarService} from "../../../../renting/services/car/car.service";
import {
  SelectedRentingOrderItemDialogComponent
} from "../../../../renting/components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {ServiceItemListComponent} from "../../proposal/service-item-list/service-item-list.component";
import {ServiceOrderService} from "../../../services/service-order/service-order.service";
import {ServiceItemOrderListComponent} from "../service-item-order-list/service-item-order-list.component";

@Component({
  selector: 'app-service-order-list',
  templateUrl: './service-order-list.component.html',
  styleUrls: ['./service-order-list.component.css']
})
export class ServiceOrderListComponent {
  user:any;
  serviceOrders!: any;
  diagnosticAux!: any
  selectedItem: any;
  vehicle: any;
  diagnosticItem: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private http: HttpClient,private authService:AuthService,
              private dialogService: DialogService,
              private serviceOrderService:ServiceOrderService,
              private carService: CarService
  ) {
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log("user as",this.user)
    this.getProposal(this.user.id);

  }
  getProposal(userId: number) {
    this.serviceOrderService.getAll().subscribe(response => {
      this.serviceOrders = response.result

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
  seeServiceItem(orderId: number) {
    let width = '60%';
    const windowWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.dialogService.open(ServiceItemOrderListComponent, {
      header: 'Service Item Order List',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data:{
        orderId: orderId
      }
    });
  }
}
