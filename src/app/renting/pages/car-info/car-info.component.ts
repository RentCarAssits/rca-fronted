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

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent {
  car: any;
  ref!: DynamicDialogRef;
  constructor(private data: DataServiceService, private router:Router,
              private dialogService: DialogService) { }

  @ViewChild('itemDialog') itemDialog!: TemplateRef<any>;
  ngOnInit() {
    this.data.currentVehicleId.subscribe(car => this.car = car);
    if(!this.car.image){
      this.router.navigate(['renting/dashboard']);
    }
    console.log('aqui :', this.car)
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
      data: { car:this.car },
    });
  }

}
