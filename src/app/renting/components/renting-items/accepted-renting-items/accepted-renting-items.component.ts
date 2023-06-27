import {Component, TemplateRef, ViewChild} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../../services/car/car.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {RefDialogServiceService} from "../../../../iam/services/ref-dialog-service.service";
import {RentingOrderItemsService} from "../../../services/renting-items/renting-order-items.service";
import {AuthService} from "../../../../iam/services/auth.service";
import {
  SelectedRentingOrderItemDialogComponent
} from "../selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {
  CreateRentingOrderDialogComponent
} from "../../renting-order/create-renting-order-dialog/create-renting-order-dialog.component";

@Component({
  selector: 'app-accepted-renting-items',
  templateUrl: './accepted-renting-items.component.html',
  styleUrls: ['./accepted-renting-items.component.css']
})
export class AcceptedRentingItemsComponent {
  acceptedItems: any[] = [];
  items: any[] = [];
  ref!: DynamicDialogRef;
  user = this.authService.getCurrentUser();
  selectedItem: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private http: HttpClient, private service: RentingOrderItemsService,
              public router: Router,
              public dialogService: DialogService,
              private dialogServiceService: RefDialogServiceService,
              private  authService:AuthService) {
  }
  ngOnInit(): void {
    this.getAcceptedItems();
  }
  getAcceptedItems(){
    this.service.getAcceptedRentingOrderItemsByUserId(this.user?.id).subscribe(
      response => {
        this.acceptedItems = response.result
      }
    )
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${year}/${month}/${day}`;
  }
  getCarStateCode(state: string): string {
    switch (state) {
      case 'A':
        return 'ACCEPTED';
      case 'D':
        return 'DENIED';
      case 'O':
        return 'ONREQUEST';
      case 'R':
        return 'ORDERED';
      default:
        return '';
    }
  }

  getCarStateClass(state: string): string {
    switch (state) {
      case 'A':
        return "customer-badge status-renewal";
      case 'D':
        return "customer-badge status-new";
      case 'O':
        return "customer-badge status-negotiation";
      case 'R':
        return 'product-badge status-outofstock';
      default:
        return '';
    }
  }

  createRentOrder(item:any){
    this.selectedItem = item;
    this.dialogService.open(CreateRentingOrderDialogComponent, {
      header: 'Create Rent Order',
      width: '800px',
      contentStyle: {'max-height': '800px', overflow: 'auto'},
      data: {item},
    });
  }
}
