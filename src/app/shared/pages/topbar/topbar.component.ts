import {Component, ElementRef, ViewChild} from '@angular/core';
import {LayoutService} from "../../services/layout/layout.service";
import {MenuItem} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../../iam/services/auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopBarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private router: Router,
              private authService: AuthService) {
  }

   logout() {
    this.authService.signOut();
    this.router.navigate(['/public/landing']);
  }

}
