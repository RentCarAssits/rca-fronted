import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../services/car/car.service";

@Component({
  selector: 'app-cars-principal-page',
  templateUrl: './cars-principal-page.html',
  styleUrls: ['./cars-principal-page.css']
})
export class CarsPrincipalPage implements OnInit {
  cars!: any[];
  responsiveOptions!: any[];
  dataSource: any[] = [];
  thisYearVehicles: any[] = []
  mostStarsVehicles: any [] = []

  constructor(private http: HttpClient, private service: CarService) {
  }


  ngOnInit() {

    this.getAllCars()
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

  getAllCars() {
    this.service.get20VehicleRandom().subscribe((response: any) => {
      this.dataSource = response.result;
      console.log(response)
    }, (error) => {
      console.log(error)
    });

    this.service.getLastYearVehicles().subscribe((response: any) => {
      this.thisYearVehicles = response.result;
      //console.log(response)
    }, (error) => {
      console.log(error)
    });

    this.service.getVehiclesByMostStars().subscribe((response: any) => {
      this.mostStarsVehicles = response.result;
      //console.log(response)
    }, (error) => {
      console.log(error)
    });
  }
}
