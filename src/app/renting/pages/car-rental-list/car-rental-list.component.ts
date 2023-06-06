import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-car-rental-list',
  templateUrl: './car-rental-list.component.html',
  styleUrls: ['./car-rental-list.component.css']
})
export class CarRentalListComponent implements  OnInit{
  cars!: any[];
  responsiveOptions!: any[];

  constructor(private http: HttpClient) { }


  ngOnInit() {

    this.http.get<any[]>('/assets/json/cars.json').subscribe(data => {
      this.cars = data; // Asigna los datos del JSON a la variable cars
      console.log(this.cars); // Puedes ver los datos en la consola
    });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];


  }
}
