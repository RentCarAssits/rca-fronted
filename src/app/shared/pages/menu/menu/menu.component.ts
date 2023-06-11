import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../services/layout/layout.service";
import {AuthService} from "../../../../iam/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService, private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/renting/dashboard']}
        ]
      },
      {
        label: 'Section 1',
        items: [
          {
            label: 'Featured Cars',
            icon: 'pi pi-fw pi-star',
            routerLink: ['/renting/cars-catalog']
          },
          {
            label: 'Full Catalog',
            icon: 'pi pi-fw pi-car',
          },
          {
            label: 'Subscriptions',
            icon: 'pi pi-fw pi-bolt',
          },
          {
            label: 'ChatBox',
            icon: 'pi pi-fw pi-comment',

          },
          {
            label: 'Statistics',
            icon: 'pi pi-fw pi-chart-bar',
          },
        ]
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-in',
            //method: this.logout()
          }
        ]
      },
      {
        label: 'General',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/public/landing']},
        ]
      },
    ];
  }

  private logout() {
    this.authService.signOut();
    this.router.navigate(['/public/landing']);
  }
}
