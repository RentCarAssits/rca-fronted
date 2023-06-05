import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicRoutingModule} from "./public-routing.module";
import {HeroComponent} from './pages/hero/hero.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {NotFoundComponent} from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    HeroComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    PrimeNgModule
  ]
})
export class PublicModule {
}
