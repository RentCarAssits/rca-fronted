import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-rental-list',
  templateUrl: './car-rental-list.component.html',
  styleUrls: ['./car-rental-list.component.css']
})
export class CarRentalListComponent implements  OnInit{
  cars!: any[];
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<any[]>('/assets/json/cars.json').subscribe(data => {
      this.cars = data; // Asigna los datos del JSON a la variable cars
      console.log(this.cars); // Puedes ver los datos en la consola
    });
  }
}
