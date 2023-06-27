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
  roles: string[] | undefined = []

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
        items: this.getSectionItems()
      },
      {
        label: 'Profile',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Profile',
            icon: 'pi pi-fw pi-user',
            routerLink: ['/renting/we-are-working/profile']
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/renting/we-are-working/settings']
          },
          {
            label: 'Logout',
            icon: 'pi pi-fw pi-sign-in',
            command: () => this.logout()
          }
        ]
      },
      {
        label: 'General',
        items: [
          {
            label: 'Landing',
            icon: 'pi pi-fw pi-globe',
            routerLink: ['/public/landing']
          },
        ]
      },
    ];
  }

  getSectionItems() {
    const items = [
      {
        label: this.getNameByRole(),
        icon: 'pi pi-fw pi-star',
        routerLink: [this.getRouteByRole()]
      },
      {
        label: 'Subscriptions',
        icon: 'pi pi-fw pi-bolt',
        routerLink: ['/renting/we-are-working/subscription']
      },
      {
        label: 'ChatBox',
        icon: 'pi pi-fw pi-comment',
        routerLink: ['/workshop/chat-box']

      },
      {
        label: 'Statistics',
        icon: 'pi pi-fw pi-chart-bar',
        routerLink: ['/renting/we-are-working/statistics']
      },
      {
        label: 'Payments',
        icon: 'pi pi-fw pi-dollar',
        routerLink: ['/billing/we-are-working/my-Payments']
      },
    ];
    if (this.roles) {
      console.log(this.roles);
      if (this.roles[0] != 'mechanic') {
        items.unshift({
          label: 'Featured Cars',
          icon: 'pi pi-fw pi-car',
          routerLink: ['/renting/feature-vehicles']
        });
      }
    } else {
      items.unshift({
        label: 'Featured Cars',
        icon: 'pi pi-fw pi-car',
        routerLink: ['/renting/feature-vehicles']
      });
    }

    return items;
  }


  private logout() {
    this.authService.signOut();
    this.router.navigate(['/public/landing']);
  }


  private getNameByRole(): string {
    this.roles = this.authService.getCurrentUser()?.roles
    if (this.roles) {
      switch (this.roles[0]) {
        case 'owner':
        case 'renter':
          return 'full catalog'
        case 'mechanic':
          return 'vehicles for maintenance'
        default:
          return 'full catalog'
      }
    }
    return 'full catalog'
  }

  private getRouteByRole(): string {
    this.roles = this.authService.getCurrentUser()?.roles
    if (this.roles) {
      switch (this.roles[0]) {
        case 'owner':
        case 'renter':
          return '/renting/vehicles-catalog'
        case 'mechanic':
          return '/workshop/maintenance-vehicles'
        default:
          return '/renting/vehicles-catalog'
      }
    }
    return '/renting/vehicles-catalog'
  }
}
