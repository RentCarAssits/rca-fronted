import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {LayoutService} from "./shared/services/layout/layout.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'rca';
  constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;


    this.layoutService.config = {
      ripple: false,
      inputStyle: 'outlined',
      menuMode: 'static',
      colorScheme: 'light',
      theme: 'lara-light-indigo',
      scale: 12
    };
  }


}
