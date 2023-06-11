import { Component } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CarService} from "../../../services/car/car.service";
import {DatePipe} from "@angular/common";
import {RentingOrderItem} from "../../../models/renting-order-item";
import {RentingOrderItemsService} from "../../../services/renting-items/renting-order-items.service";
import {CloudinaryService} from "../../../../shared/services/cloudinary/cloudinary.service";

@Component({
  selector: 'app-create-renting-item',
  templateUrl: './create-renting-item.component.html',
  styleUrls: ['./create-renting-item.component.css']
})
export class CreateRentingItemComponent {
  car: any;
  rentingItemForm!: FormGroup;
  constructor(
                private formBuilder: FormBuilder,
               private service: RentingOrderItemsService,
               private datePipe: DatePipe,
                private config: DynamicDialogConfig,
                public dialogRef: DynamicDialogRef) {
    this.rentingItemForm = this.formBuilder.group({
      startDate: [''],
      endDate: [''],
    });

  }
  ngOnInit(): void {

  }
  onSubmit()
  {
    this.car = this.config.data.car;
    let {startDate, endDate} = this.rentingItemForm.value;
    //console.log(this.rentingItemForm);
    //console.log(this.car)
    const rentingItem: RentingOrderItem={
      id:0,
    startDate:this.rentingItemForm.value.startDate,
    endDate:this.rentingItemForm.value.startDate,
    rentingPrice:'45',
    rentingUnit:"D",
    currency:'USD',
    state:'O',
    vehicleId: this.car.id,
      requesterId:0
  }
    const body = {
      rentingPrice:rentingItem.rentingPrice,
      currency:rentingItem.currency,
      startDate:rentingItem.startDate,
      endDate:rentingItem.endDate,
      vehicleId:rentingItem.vehicleId,
      rentingUnit:rentingItem.rentingUnit

    };
    this.service.create(body).subscribe(response => {
          //console.log(response);
          this.dialogRef.close();
        }, err => {
    console.error('Error:', err);
  });

  }
}
