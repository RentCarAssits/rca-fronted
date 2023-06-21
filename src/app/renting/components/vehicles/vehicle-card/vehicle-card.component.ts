import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../../services/car/car.service";
import {LoginFormComponent} from "../../../../iam/pages/sign-in/login-form.component";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {RefDialogServiceService} from "../../../../iam/services/ref-dialog-service.service";
import {EditFormCarComponent} from "../edit-form-car/edit-form-car.component";
import {CreateCarFormComponent} from "../create-car-form/create-car-form.component";

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit {

  ownerCars: any[] = [];
  items: any[] = [];
  ref!: DynamicDialogRef;

  constructor(private http: HttpClient, private service: CarService,
              public router: Router,
              public messageService: MessageService,
              public dialogService: DialogService,
              private dialogServiceService: RefDialogServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getVehiclesByOwner()
    this.items = [
      {label: 'Add New', icon: 'pi pi-fw pi-plus'}
    ];
  }

  showVehicleDialog(car: any) {
    let width = '60%';
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }

    this.ref = this.dialogService.open(EditFormCarComponent, {
      data: {car: car},
      width: width,
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe(() => {
      this.getVehiclesByOwner();
    });
  }

  showCreateVehicleDialog() {
    let width = '60%';
    const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth < 768) {
      width = '100%';
    } else if (windowWidth < 1200) {
      width = '80%';
    }
    this.ref = this.dialogService.open(CreateCarFormComponent, {
      width: width,
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
    });
    this.ref.onClose.subscribe(() => {
      this.getVehiclesByOwner();
    });
  }


  getVehiclesByOwner() {
    this.service.getVehicleByOwner().subscribe((response: any) => {
      this.ownerCars = response.result;
      console.log('ownerCars: ', this.ownerCars)
    }, (error) => {
      console.log(error)
    });
  }

  getCarStateCode(state: string): string {
    switch (state) {
      case '0':
        return 'MAINTENANCE';
      case '1':
        return 'AVAILABLE';
      case '2':
        return 'RENTED';
      case '3':
        return 'UNAVAILABLE';
      default:
        return '';
    }
  }

  getCarStateClass(state: string): string {
    switch (state) {
      case '0':
        return "customer-badge status-renewal";
      case '1':
        return "customer-badge status-new";
      case '2':
        return "customer-badge status-negotiation";
      case '3':
        return 'product-badge status-outofstock';
      default:
        return '';
    }
  }

  editVehicleById(car: any) {
    console.log(car)
    this.showVehicleDialog(car)
  }


  showCreateDialog() {
    this.showCreateVehicleDialog()
  }
}
