import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RentingOrderItemsService} from "../../../services/renting-items/renting-order-items.service";
import { DialogService } from 'primeng/dynamicdialog';
import {
  SelectedRentingOrderItemDialogComponent
} from "../selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";



@Component({
  selector: 'app-renting-order-items',
  templateUrl: './renting-order-items.component.html',
  styleUrls: ['./renting-order-items.component.css']
})
export class RentingOrderItemsComponent implements OnInit{

  @Input() parameter: any;
  rentingOrderItems!: any[];
  vehiclesId: number[] | undefined;
  selectedItem: any;
  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  constructor(private rentingItemOrderService:RentingOrderItemsService,private dialogService: DialogService) { }
  ngOnInit(): void {
      this.vehiclesId=this.parameter;

      this.getRentingOrderItemsById();
  }
  getRentingOrderItemsById(){
    // @ts-ignore
    this.rentingItemOrderService.getByVehiclesId(this.vehiclesId).subscribe(data => {
      this.rentingOrderItems = data.result; // Asigna los datos del JSON a la variable cars
      console.log(this.rentingOrderItems); })
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
      this.getRentingOrderItemsById();
    });
  }

  denyRequest(id: any) {

    this.rentingItemOrderService.updateRentingItemStateId(id, 'D').subscribe(() => {
      this.getRentingOrderItemsById();
    });
  }
  showItemDialog(item: any) {
    console.log(item);
    this.selectedItem = item;
    this.dialogService.open(SelectedRentingOrderItemDialogComponent, {
      header: 'Request Details',
      width: '500px',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      data: { item },
    });
  }
}
