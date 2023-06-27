import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CloudinaryService} from "../../../../shared/services/cloudinary/cloudinary.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CarService} from "../../../services/car/car.service";
import {catchError, Observable, retry} from "rxjs";
import {DatePipe} from "@angular/common";
import {MessageService} from "primeng/api";

interface VehicleState {
  name: number;
  code: string;
}

@Component({
  selector: 'app-edit-form-car',
  templateUrl: './edit-form-car.component.html',
  styleUrls: ['./edit-form-car.component.css']
})
export class EditFormCarComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  car!: any;
  carForm!: FormGroup;
  imageToShow!: string;
  selectedFile!: File;
  categories: string[] = [];
  vehicleState!: any[]
  currency!: any []
  timeUnit!: any []

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private cloudinaryService: CloudinaryService,
              private dialogRef: DynamicDialogRef,
              private formBuilder: FormBuilder,
              private service: CarService,
              private datePipe: DatePipe,
              private message: MessageService
  ) {

  }

  ngOnInit(): void {
    this.currency = [
      {name: 'USD', code: '$ Dollar'},
      {name: 'SOLES', code: 'S/ Sol'},
      {name: 'EUR', code: 'Є Euro'},
    ];

    this.vehicleState = [
      {name: 1, code: 'AVAILABLE'},
      {name: 0, code: 'MAINTENANCE'},
      {name: 2, code: 'RENTED'},
      {name: 3, code: 'UNAVAILABLE'},
    ];

    this.timeUnit = [
      {name: 'H', code: 'HOUR'},
      {name: 'D', code: 'DAY'},
      {name: 'W', code: 'WEEK'},
    ]

    this.car = this.config.data.car;
    this.categories = this.car.categories;
    //console.log('this.car: ', this.car);

    this.carForm = this.formBuilder.group({
      name: [this.car.name, Validators.required],
      brand: [this.car.brand, Validators.required],
      model: [this.car.model, Validators.required],
      integrity: [this.car.integrity, Validators.required],
      state: [{value: Number(this.car.state), disabled: true}, Validators.required],
      year: [new Date(this.car.year), Validators.required],
      price: [this.car.price, Validators.required],
      categories: new FormControl<string[] | null>(this.categories),
      currency: [this.car.currency, Validators.required],
      timeUnit: [this.car.timeUnit, Validators.required]
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageToShow = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  get categoriesArray(): string[] {
    return this.carForm.value.categories
  }


  onSubmit() {
    if (!this.carForm.valid) {
      return;
    }
    let {image, year, state, ...rest} = this.carForm.value;

    const data = {
      image: image,
      stars: this.car.stars,
      state: Number(this.carForm.getRawValue().state),
      year: new Date(year).toISOString().slice(0, 10),
      ...rest
    };
    console.log('data : ', data);
    if (this.selectedFile) {
      this.uploadImage(this.selectedFile)
        .subscribe(response => {
          data.image = response.url;
          this.saveData(data);
        }, error => {
          console.error('Error uploading image:', error);
        });
    } else {
      this.saveData(data);
    }
  }

  uploadImage(image: File): Observable<any> {
    return this.cloudinaryService.uploadImage(image);
  }

  saveData(data: any) {
    this.service.update(this.car.id, data).subscribe(response => {
      this.showSuccess();
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    }, err => {
      this.showError();
      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);

    });
  }

  getVehicleState(stateNumber: number): VehicleState | null {
    const state = this.vehicleState.find(s => s.name === stateNumber);
    return state ? state : null;
  }

  showSuccess() {
    this.message.add({severity: 'success', summary: 'Success', detail: 'Operation completed successfully'});
  }

  showError() {
    this.message.add({severity: 'error', summary: 'Error', detail: 'An error occurred. Please try again.'});
  }

}
