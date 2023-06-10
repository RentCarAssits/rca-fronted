import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
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
      {name: 0, code: 'MANTENIMIENTO'},
      {name: 1, code: 'DISPONIBLE'},
      {name: 2, code: 'ALQUILADO'},
      {name: 3, code: 'NO DISPONIBLE'},
    ];


    console.log('this.categories: ', this.categories);

    this.carForm = this.formBuilder.group({
      name: [''],
      brand: [''],
      model: [''],
      integrity: [''],
      state: [0],
      year: [''],
      price: [''],
      unit: [''],
      categories: new FormControl<string[] | null>(this.categories),
      image: [''],
      stars: ['']
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
      state: state,
      ...rest
    }


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
