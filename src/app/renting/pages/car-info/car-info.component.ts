import {Component, TemplateRef, ViewChild} from '@angular/core';
import {DataServiceService} from "../../services/data/data-service.service";
import {Router} from "@angular/router";
import {
  SelectedRentingOrderItemDialogComponent
} from "../../components/renting-items/selected-renting-order-item-dialog/selected-renting-order-item-dialog.component";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {EditFormCarComponent} from "../../components/vehicles/edit-form-car/edit-form-car.component";
import {
  CreateRentingItemComponent
} from "../../components/renting-items/create-renting-item/create-renting-item.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {RentingOrderItem} from "../../models/renting-order-item";
import {RentingOrderItemsService} from "../../services/renting-items/renting-order-items.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {
  car: any;
  ref!: DynamicDialogRef;
  rentingItemForm!: FormGroup;

  constructor(private data: DataServiceService, private router: Router,
              private dialogService: DialogService,
              private formBuilder: FormBuilder,
              private datePipe: DatePipe,
              private service: RentingOrderItemsService,
              private message: MessageService
  ) {

  }

  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;

  ngOnInit() {
    this.rentingItemForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.data.currentVehicleId.subscribe(car => this.car = car);
    if (!this.car.image) {
      this.router.navigate(['renting/vehicles-catalog']);
    }
  }

  showCreateDialog() {
    let width = '60%';
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.dialogService.open(CreateRentingItemComponent, {
      header: 'Create Car',
      width: width,
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      data: {car: this.car},
    });
  }

  onSubmit() {
    if (!this.rentingItemForm.valid) return;
    let finalPrice=0;

    let {startDate, endDate} = this.rentingItemForm.value;
    const request = {
      rentingPrice: this.getFinalPrice(this.rentingItemForm.value.startDate,this.rentingItemForm.value.endDate).toString(),
      currency: this.car.currency,
      startDate: this.rentingItemForm.value.startDate,
      endDate: this.rentingItemForm.value.endDate,
      vehicleId: this.car.id,
      rentingUnit: this.car.timeUnit,
    };
    this.service.create(request).subscribe(
      {
        next: (response) => {
          // console.log('create Renting Order Item ',response)
        },
        error: (err) => {
          this.showError()
          setTimeout(() => {
            this.router.navigate(['renting/vehicles-catalog']);
          }, 1500);
        },
        complete: () => {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['renting/vehicles-catalog']);
          }, 1500);

        }
      }
    );

  }

  showSuccess() {
    this.message.add({severity: 'success', summary: 'Success', detail: 'Operation completed successfully'});
  }

  showError() {
    this.message.add({severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.'});
  }


  getFinalPrice(startDate:any, endDate:any):number{
    const fechaInicio: Date = new Date(startDate);
    const fechaFin: Date = new Date(endDate);
    // Calcular la diferencia en milisegundos entre las dos fechas
    const diferencia: number = fechaFin.getTime() - fechaInicio.getTime();
    switch (this.car?.timeUnit){
      case 'H':
        return 1;
      case 'D':
        // Calcular la diferencia en días y semanas
        const dias: number = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        return this.car.price*dias;
      case 'W':
        const semanas: number = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 7));
        return this.car.price*semanas;
      default:
        return 1;
    }
  }
}
