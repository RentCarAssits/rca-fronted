import { Component, Input } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import {CarService} from "../../../services/car/car.service";

@Component({
  selector: 'app-selected-renting-order-item-dialog',
  templateUrl: './selected-renting-order-item-dialog.component.html',
  styleUrls: ['./selected-renting-order-item-dialog.component.css']
})
export class SelectedRentingOrderItemDialogComponent {
  item: any;
  rentingItem:any;
  car:any;
  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private carService:CarService
  ) {
    this.item = this.config.data.item;
  }
  ngOnInit(): void {
    this.rentingItem=this.item;
    this.getCarById(this.rentingItem.id);
  }
  getCarById(id:number){
    this.carService.getById(id).subscribe(
      data => {
        console.log(data);
        this.car = data.result; // Asigna los datos del JSON a la variable cars

      }
    )
  }
}
