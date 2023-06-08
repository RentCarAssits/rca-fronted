import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CloudinaryService} from "../../../../shared/services/cloudinary/cloudinary.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CarService} from "../../../services/car/car.service";
import {catchError, Observable, retry} from "rxjs";

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

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private cloudinaryService: CloudinaryService,
              private dialogRef: DynamicDialogRef,
              private formBuilder: FormBuilder,
              private service: CarService
  ) {

  }

  ngOnInit(): void {
    this.vehicleState = [
      {name: '0', code: 'MANTENIMIENTO'},
      {name: '1', code: 'DISPONIBLE'},
      {name: '2', code: 'ALQUILADO'},
      {name: '3', code: 'NO DISPONIBLE'},
    ];

    this.car = this.config.data.car;
    this.categories = this.car.categories;
    console.log('this.categories: ', this.categories);

    this.carForm = this.formBuilder.group({
      name: [this.car.name],
      brand: [this.car.brand],
      model: [this.car.model],
      integrity: [this.car.integrity],
      state: [this.car.state],
      year: [this.car.year],
      price: [this.car.price],
      unit: [this.car.unit],
      categories: new FormControl<string[] | null>(this.categories),
      image: [this.car.image],
      stars: [this.car.stars]
    });


    console.log('this.car.state : ', this.car.state)
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
    console.log(state);

    const data = {
      image: image,
      state: state,
      year: new Date(year).toISOString().slice(0, 10),
      ...rest
    };

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

}
