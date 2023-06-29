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
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-home',
            routerLink: ['/renting/dashboard'],
          },
        ],
      },
      {
        label: 'Section 1',
        items: [
          {
            label: 'Featured Cars',
            icon: 'pi pi-fw pi-car',
            routerLink: ['/renting/cars-catalog'],
          },
          {
            label: 'Full Catalog',
            icon: 'pi pi-fw pi-star',
            routerLink: ['/renting/we-are-working/full-catalog'],
          },
          {
            label: 'Subscriptions',
            icon: 'pi pi-fw pi-bolt',
            routerLink: ['/renting/we-are-working/subscription'],
          },
          {
            label: 'ChatBox',
            icon: 'pi pi-fw pi-comment',
            routerLink: ['/workshop/chat-box'],
          },
          {
            label: 'Statistics',
            icon: 'pi pi-fw pi-chart-bar',
            routerLink: ['/renting/we-are-working/statistics'],
          },
        ],
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/renting/we-are-working/profile'],
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/renting/we-are-working/settings'],
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-in',
            command: () => this.logout(),
          },
        ],
      },
      {
        label: 'General',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/public/landing'],
          },
        ],
      },
    ];
  }

  private logout() {
    this.authService.signOut();
    this.router.navigate(['/public/landing']);
  }
}
