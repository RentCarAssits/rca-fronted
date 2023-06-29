import {Component} from '@angular/core';
import {LayoutService} from "../../../../shared/services/layout/layout.service";
import {MenuItem} from "primeng/api";
import {CarService} from "../../../services/car/car.service";
import {RentingOrderItemsService} from 'src/app/renting/services/renting-items/renting-order-items.service';
import {elementAt} from 'rxjs';
import {error} from '@angular/compiler-cli/src/transformers/util';
import {AuthService} from 'src/app/iam/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  //// data for graphics

  basicData: any;
  basicOptions: any;

  currentuser: any;
  elementos: any;
  dataGraphics: any = [];

  ///////////////


  items!: MenuItem[];

  //products!: Product[];

  chartData: any;

  chartOptions: any;

  subscription!: any;
  totalVehicles: number = 0;
  userRole:any;
  constructor( 
    public layoutService: LayoutService, 
    private carService: CarService,
    private rentingOrderItemsServices:RentingOrderItemsService, 
    private authService:AuthService) 
    {this.subscription = this.layoutService.configUpdate$.subscribe(() => {});}

  ngOnInit() {
    this.getTotalVehicles();
    this.getCurrenUserId();
    this.getData();
    this.initChart();
    this.items = [
      {label: 'Add New', icon: 'pi pi-fw pi-plus'},
      {label: 'Remove', icon: 'pi pi-fw pi-minus'}
    ];

    //// graphic scale
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');


    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
    /////

  }

  initChart() {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTotalVehicles() {
    this.carService.getVehicleByOwner().subscribe(
      (response: any) => {
        this.totalVehicles = Number(response.result?.length);
        if (!this.totalVehicles) this.totalVehicles = 0
        //console.log(this.totalVehicles);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getVehiclesId() {
    this.carService.getVehicleByOwner().subscribe(
      (response: any) => {
        this.totalVehicles = Number(response.result?.length);
        //console.log(this.totalVehicles);
      },
      (error) => {
        console.log(error);
      }
    );    
  }

  getCurrenUserId() {
    let user = this.authService.getCurrentUser();
    this.currentuser = user?.id;
    this.userRole = user?.roles
    console.log(this.userRole);
    console.log('rol: ',  this.userRole[0])
    this.userRole=user?.roles;
    console.log("USER ID: ",user);
    console.log("USER ID: ",this.currentuser);

  }

  getData() {
    //this.rentingOrderItemsServices.getRentingOrderItemsByUserId(this.currentuser).subscribe({
    this.rentingOrderItemsServices.getRentingOrderItemsByUserId(this.currentuser).subscribe({
      next: (response) => {
        this.elementos = response.result;
        this.dataGraphics = this.elementos.map((vehicle: any) => {
          console.log('vehicle.state', vehicle.state)
          return vehicle.state;
        })
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {

        let accepts = 0
        let denied = 0
        let pending = 0

        console.log(this.dataGraphics);

        this.dataGraphics.map((e: any) => {
          if (e === 'A') {
            accepts += 1
          }
          if (e === 'O') {
            pending += 1
          }
          if (e === 'D') {
            denied += 1
          }
        })
        this.basicData = {
          labels: ['Accepted', 'Pending', 'Denied'],
          datasets: [
            {
              label: 'Orders',
              data: [accepts, pending, denied],
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(153, 102, 255)'],
              borderWidth: 1
            }
          ]
        };
      },
    });
  }

}

