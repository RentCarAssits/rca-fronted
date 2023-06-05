import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginFormComponent} from './pages/sign-in/login-form.component';
import {PrimeNgModule} from "../prime-ng/prime-ng.module";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "./services/auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    PasswordModule,
    FormsModule,
    RouterLink,
  ],
  providers: [
    AuthService,
    HttpClient,
    HttpClientModule
    // MessageService
  ],
  exports: [
    LoginFormComponent
  ]
})
export class IAMModule {
}
