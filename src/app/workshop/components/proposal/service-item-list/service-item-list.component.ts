import {Component, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../iam/services/auth.service";
import {DialogService, DynamicDialogConfig} from "primeng/dynamicdialog";
import {ProposalService} from "../../../services/proposal/proposal.service";
import {CarService} from "../../../../renting/services/car/car.service";
import {
  SelectedRentingOrderItemDialogComponent
} from "../../../../renting/components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {CreateProposalComponent} from "../create-proposal/create-proposal.component";
import {ServiceItemService} from "../../../services/service-item/service-item.service";
import {RequestItemListComponent} from "../request-item-list/request-item-list.component";

@Component({
  selector: 'app-service-item-list',
  templateUrl: './service-item-list.component.html',
  styleUrls: ['./service-item-list.component.css']
})
export class ServiceItemListComponent {
  user:any;
  serviceItems!: any;
  diagnosticAux!: any
  selectedItem: any;
  vehicle: any;
  diagnosticItem: any;
  proposalId: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private http: HttpClient,private authService:AuthService,
              private dialogService: DialogService,
              private serviceItemService:ServiceItemService,
              private config: DynamicDialogConfig,
  ) {
    this.proposalId = this.config.data.proposalId
  }
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    console.log("user as",this.user)
    this.getProposal(this.proposalId);

  }
  getProposal(proposalId: number) {
    this.serviceItemService.getAllServiceItemByProposal(proposalId).subscribe(response => {
      this.serviceItems = response.result

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
  seeRequestItem(ServiceItemId: number) {
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

    this.dialogService.open(RequestItemListComponent, {
      header: 'Create Request Item',
      width: width,
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data:{
        serviceItemId: ServiceItemId,
        proposalI: this.proposalId
      }
    });
  }
}
