import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegisterUser} from "../../models/registerUser";
import {Profile} from "../../models/profile";
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LoginFormComponent} from "../sign-in/login-form.component";
import {RefDialogServiceService} from "../../services/ref-dialog-service.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm!: FormGroup;
  dialogRef!: DynamicDialogRef;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private refRegisterDialog : RefDialogServiceService
  ) {
    this.signupForm = formBuilder.group({
      userName: ['',],
      userType: ['renter',],
      email: ['', ],
      password: ['', ],
      firstname: ['', ],
      lastname: ['', ],
      address: ['', ],
      dni: ['', ],
      phone: ['',]
    });
  }

  rolUser: any[] = [
    {name: 'RENTER', code: 'renter'},
    {name: 'OWNER', code: 'owner'},
    {name: 'MECHANIC', code: 'mechanic'},
  ];


  onSubmit() {

    const profile: Profile = {
      fullName: `${this.signupForm.value.firstname} ${this.signupForm.value.lastname}`,
      address: this.signupForm.value.address,
      phone: this.signupForm.value.phone,
      dni: this.signupForm.value.dni
    }
    const registerUser: RegisterUser = {
      userName: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      roles: [this.signupForm.value.userType],
      profile: profile
    }

    this.router.navigate(['/public/landing']).then();
    this.authService.signUp(registerUser).subscribe(response => {
      this.authService.setToken(response.token);
      this.authService.setCurrentUser(response);
      this.refRegisterDialog.registerCompleted();
    });

  }





}
