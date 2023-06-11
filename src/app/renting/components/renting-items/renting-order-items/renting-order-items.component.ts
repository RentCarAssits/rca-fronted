import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RentingOrderItemsService} from "../../../services/renting-items/renting-order-items.service";
import {DialogService} from 'primeng/dynamicdialog';
import {
  SelectedRentingOrderItemDialogComponent
} from "../selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {AuthService} from "../../../../iam/services/auth.service";
import {User} from "../../../../iam/models/user";
import {CarService} from "../../../services/car/car.service";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-renting-order-items',
  templateUrl: './renting-order-items.component.html',
  styleUrls: ['./renting-order-items.component.css']
})
export class RentingOrderItemsComponent implements OnInit {
  ownerVehicles: any = {};
  rentingOrderItems!: any[];
  vehiclesId!: number[];
  selectedItem: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  idFrozen: any;

  user = this.authService.getCurrentUser();

  constructor(private rentingItemOrderService: RentingOrderItemsService,
              private dialogService: DialogService,
              private authService: AuthService,
              private carService: CarService
  ) {
  }

  ngOnInit(): void {
    this.getRentingOrderItems()

  }

  getRentingOrderItems() {
    if (this.user?.roles!?.includes('renter')) {
      if (this.user?.id) this.getRentingOrderItemsByUserId(this.user?.id)
    }
    if (this.user?.roles!?.includes('owner')) {
      this.getOwnerVehiclesIds()
    }
  }


  getRentingOrderItemsByUserId(userId: number) {
    this.rentingItemOrderService.getRentingOrderItemsByUserId(userId).subscribe(response => {
      this.rentingOrderItems = response.result
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

  acceptRequest(id: any) {
    this.rentingItemOrderService.updateRentingItemStateId(id, 'A').subscribe(() => {
      this.getRentingOrderItems();
    });
  }

  denyRequest(id: any) {
    this.rentingItemOrderService.updateRentingItemStateId(id, 'D').subscribe(() => {
      this.getRentingOrderItems();
    });
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

  getOwnerVehiclesIds() {
    this.carService.getVehicleByOwner().subscribe(
      {
        next: (response) => {
          this.ownerVehicles = response.result
        },
        error: (err) => {
          console.log(err)
        },
        complete: () => {
          this.vehiclesId = this.ownerVehicles.map((vehicle: any) => {
            return vehicle.id;
          })
          this.rentingItemOrderService.getByVehiclesId(this.vehiclesId).subscribe(
            data => {
              this.rentingOrderItems = data.result;
              //console.log(this.rentingOrderItems);
            })
        }
      }
    );
  }
}
