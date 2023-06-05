import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './pages/layout/layout.component';
import {LayoutService} from "./services/layout/layout.service";
import { MenuComponent } from './pages/menu/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { TopBarComponent } from './pages/topbar/topbar.component';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    LayoutComponent,
    MenuComponent,
    FooterComponent,
    MenuItemComponent,
    SidebarComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterOutlet,
    PrimeNgModule,
    RouterLink,
    RouterLinkActive
  ],
  providers:[
    LayoutService,
    HttpClientModule
  ]
})
export class SharedModule { }
