import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CloudinaryService} from "../../../../shared/services/cloudinary/cloudinary.service";
import {CarService} from "../../../services/car/car.service";
import {Observable} from "rxjs";
import {DatePipe} from "@angular/common";

interface VehicleState {
  name: number;
  code: string;
}

@Component({
  selector: 'app-create-car-form',
  templateUrl: './create-car-form.component.html',
  styleUrls: ['./create-car-form.component.css']
})
export class CreateCarFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;


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
              private datePipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    this.vehicleState = [
      {name: 1, code: 'AVAILABLE'},
      {name: 0, code: 'MAINTENANCE'},
      {name: 2, code: 'RENTED'},
      {name: 3, code: 'UNAVAILABLE'},
    ];

    this.currency = [
      {name: 'USD', code: '$ Dollar'},
      {name: 'SOLES', code: 'S/ Sol'},
      {name: 'EUR', code: 'Є Euro'},
    ];

    this.timeUnit = [
      {name: 'H', code: 'HOUR'},
      {name: 'D', code: 'DAY'},
      {name: 'W', code: 'WEEK'},
    ]


    //console.log('this.categories: ', this.categories);

    this.carForm = this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      image: [''],
      integrity: ['', Validators.required],
      state: [{value: 1, disabled: true}, Validators.required],
      year: ['', Validators.required],
      categories: new FormControl<string[] | null>(this.categories),
      price: [0, Validators.required],
      currency: ['USD', Validators.required],
      timeUnit: ['D', Validators.required]
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
    let {image, year, state, ...rest} = this.carForm.value;

    const data = {
      image: image,
      year: this.transformDate(year),
      state: 1,
      ...rest
    }

    //console.log('data: ', data);
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
    this.service.create(data).subscribe(response => {
      console.log(response);
      this.dialogRef.close();
    }, err => {
      console.error('Error:', err);
    });
  }

  getVehicleState(stateNumber: number): VehicleState | null {
    const state = this.vehicleState.find(s => s.name === stateNumber);
    return state ? state : null;
  }

  transformDate(date: string): string {
    let dateObj = new Date(date);
    return <string>this.datePipe.transform(dateObj, 'yyyy-MM-dd');
  }

}
