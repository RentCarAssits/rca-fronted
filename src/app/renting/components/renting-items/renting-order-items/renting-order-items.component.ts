import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RentingOrderItemsService} from "../../../service/renting-items/renting-order-items.service";

@Component({
  selector: 'app-renting-order-items',
  templateUrl: './renting-order-items.component.html',
  styleUrls: ['./renting-order-items.component.css']
})
export class RentingOrderItemsComponent implements OnInit{
  @Input() parameter: any;
  rentingOrderItems!: any[];
  vehiclesId: number[] | undefined;
  constructor(private rentingItemOrderService:RentingOrderItemsService) { }
  ngOnInit(): void {
      this.vehiclesId=this.parameter;
      console.log("vhi",this.vehiclesId);
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
  acceptRequest(id:any){

  }
  denyRequest(id:any){

  }
}
