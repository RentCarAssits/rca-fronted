import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {PrimeNgModule} from "./prime-ng/prime-ng.module";
import {RentingModule} from "./renting/renting.module";
import {PublicModule} from "./public/public.module";
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {PublicRoutingModule} from "./public/public-routing.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /**Modules**/
    PrimeNgModule,
    PublicModule,
    SharedModule,
    PublicRoutingModule,
    RentingModule //BC
    /**Modules**/
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
