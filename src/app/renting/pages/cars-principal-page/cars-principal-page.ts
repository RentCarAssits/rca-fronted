import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarService} from "../../services/car/car.service";
import {DataServiceService} from "../../services/data/data-service.service";
import {Router} from "@angular/router";

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
  size:any = 10
  constructor(private http: HttpClient,
              private service: CarService,
              private dataService : DataServiceService,
              private router: Router
              ) {
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

  requestVehicle(car: any) {
    //console.log('vehicle: ', car);
    this.dataService.changeVehicleId(car);
    this.router.navigate(['renting/car-info-request']);

  }
}
