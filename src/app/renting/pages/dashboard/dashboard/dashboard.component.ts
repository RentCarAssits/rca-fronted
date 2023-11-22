import { Component, ViewChild } from '@angular/core';
import { LayoutService } from '../../../../shared/services/layout/layout.service';
import { MenuItem } from 'primeng/api';
import { CarService } from '../../../services/car/car.service';
import { RentingOrderItemsService } from 'src/app/renting/services/renting-items/renting-order-items.service';
import { elementAt } from 'rxjs';
import { error } from '@angular/compiler-cli/src/transformers/util';
import { AuthService } from 'src/app/iam/services/auth.service';
import { User } from '../../../../iam/models/user';
import { PlanService } from '../../../../subscriptions/services/plan.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  basicData: any;
  basicOptions: any;
  currentuser: any;
  elementos: any;

  user: any;
  items!: MenuItem[];
  subscription!: any;
  totalVehicles: number = 0;
  userRole: any;
  currentPlan: any;
  points = [];
  chart: any;
  chartOptions: any;

  constructor(
    public layoutService: LayoutService,
    private planService: PlanService,
    private carService: CarService,
    private rentingOrderItemsServices: RentingOrderItemsService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {});
  }

  ngOnInit() {
    this.getInitialInfo();
    this.getTotalVehicles();
    this.getCurrenUserId();
    //this.getData();
    this.initChart();
    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' },
    ];
  }

  initChart() {
    let dataTemperature: any = [];
    let dataHumidity: any = [];

    this.chartOptions = {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: 'Vehicle Information',
      },
      axisX: {
        valueFormatString: 'D MMM',
      },
      axisY: {
        title: 'Temperature & humidity',
      },
      toolTip: {
        shared: true,
      },
      legend: {
        cursor: 'pointer',
        itemclick: function (e: any) {
          if (
            typeof e.dataSeries.visible === 'undefined' ||
            e.dataSeries.visible
          ) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          e.chart.render();
        },
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          name: 'Temperature',
          xValueFormatString: 'MMM DD, YYYY',
          dataPoints: [
            { x: new Date(2021, 8, 1), y: 63 },
            { x: new Date(2021, 8, 2), y: 69 },
            { x: new Date(2021, 8, 3), y: 65 },
            { x: new Date(2021, 8, 4), y: 70 },
            { x: new Date(2021, 8, 5), y: 71 },
            { x: new Date(2021, 8, 6), y: 65 },
            { x: new Date(2021, 8, 7), y: 73 },
          ],
        },
        {
          type: 'line',
          showInLegend: true,
          name: 'Humidity',
          dataPoints: [
            { x: new Date(2021, 8, 1), y: 60 },
            { x: new Date(2021, 8, 2), y: 57 },
            { x: new Date(2021, 8, 3), y: 51 },
            { x: new Date(2021, 8, 4), y: 56 },
            { x: new Date(2021, 8, 5), y: 54 },
            { x: new Date(2021, 8, 6), y: 55 },
            { x: new Date(2021, 8, 7), y: 54 },
          ],
        },
      ],
    };
    this.carService.getVehicleInfo().subscribe({
      next: (response) => {
        dataTemperature = [...response.result.value].map((info: any) => ({
          x: new Date(info.date),
          y: info.temperatura,
        }));

        dataHumidity = [...response.result.value].map((info: any) => ({
          x: new Date(info.date),
          y: info.humedad,
        }));
      },
      error: (error) => {
        console.log('sexo', error);
      },
      complete: () => {
        this.chartOptions = {
          animationEnabled: true,
          theme: 'light2',
          title: {
            text: 'Vehicle Information',
          },
          axisX: {
            valueFormatString: 'D MMM',
          },
          axisY: {
            title: 'Temperature & humidity',
          },
          toolTip: {
            shared: true,
          },
          legend: {
            cursor: 'pointer',
            itemclick: function (e: any) {
              if (
                typeof e.dataSeries.visible === 'undefined' ||
                e.dataSeries.visible
              ) {
                e.dataSeries.visible = false;
              } else {
                e.dataSeries.visible = true;
              }
              e.chart.render();
            },
          },
          data: [
            {
              type: 'line',
              showInLegend: true,
              name: 'Temperature',
              xValueFormatString: 'MMM DD, YYYY',
              dataPoints: dataTemperature,
            },
            {
              type: 'line',
              showInLegend: true,
              name: 'Humidity',
              dataPoints: dataHumidity,
            },
          ],
        };

        console.log(this.chartOptions);
      },
    });
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
        if (!this.totalVehicles) this.totalVehicles = 0;
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
    this.userRole = user?.roles;
    this.userRole = user?.roles;
  }

  // getData() {
  //   this.carService.getVehicleInfo().subscribe({
  //     next: (response) => {
  //       this.elementos = response.result.value;
  //       this.dataGraphics = this.elementos.map((info: any) => {
  //         return info.temperature;
  //       });

  //       this.points = this.elementos.map((info: any) => {
  //         return info.id;
  //       });
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //     complete: () => {},
  //   });
  // }

  getInitialInfo() {
    this.user = this.authService.getCurrentUser();

    this.planService.getCurrentPlanByUser(this.user.account.id).subscribe({
      next: (res) => {
        this.currentPlan = res.result.name;
      },
    });
  }
}
