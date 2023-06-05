import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PrimeNgModule} from "./prime-ng/prime-ng.module";
import {RentingModule} from "./renting/renting.module";
import {PublicModule} from "./public/public.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {PublicRoutingModule} from "./public/public-routing.module";
import {IAMModule} from "./iam/iam.module";
import {AuthService} from "./iam/services/auth.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    /**Modules**/
    PrimeNgModule,
    PublicModule,
    SharedModule,
    PublicRoutingModule,
    IAMModule,
    RentingModule //BC
    /**Modules**/
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
