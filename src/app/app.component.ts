import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rca-fronted';

  options = [

    { path: '/public', title: 'Public'},
    { path: '/about', title: 'About'}
  ];

  constructor(private router: Router) {

  }
}
