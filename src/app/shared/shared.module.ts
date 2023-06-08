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
import {BaseService} from "./services/base/base.service";
import {MenuService} from "./services/menu/menu.service";
import {CloudinaryService} from "./services/cloudinary/cloudinary.service";
import {ResourceService} from "./services/base/resource.service";



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
    MenuService,
    ResourceService,
    HttpClientModule,
    CloudinaryService
  ]
})
export class SharedModule { }
