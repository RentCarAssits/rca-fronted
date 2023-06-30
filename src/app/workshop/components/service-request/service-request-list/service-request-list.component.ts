import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../iam/services/auth.service";
import {DialogService} from "primeng/dynamicdialog";
import {RentingOrderItemsService} from "../../../../renting/services/renting-items/renting-order-items.service";
import {
  SelectedRentingOrderItemDialogComponent
} from "../../../../renting/components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {ServiceRequestService} from "../../../services/service-request.service";
import {WarehouseCreationComponent} from "../../warehouse-creation/warehouse-creation.component";
import {CreateServiceRequestComponent} from "../create-service-request/create-service-request.component";

@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.css']
})
export class ServiceRequestListComponent {
  user:any;
  serviceRequests!: any[];
  selectedItem: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private http: HttpClient,private authService:AuthService,
              private dialogService: DialogService,
              private serviceRequestService:ServiceRequestService
  ) {
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log("user as",this.user)
    this.getRentingOrderItemsByUserId(this.user.id);

  }
  getRentingOrderItemsByUserId(userId: number) {
    this.serviceRequestService.getFullByOwner(userId).subscribe(response => {
      this.serviceRequests = response.result
      console.log(userId)
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
  createWorkshop() {
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

    this.dialogService.open(CreateServiceRequestComponent, {
      header: 'Create Service Request',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

}
