import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm!: FormGroup;
  selectedState: any = null;

  constructor(private formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      userName: ['', Validators.required],
      userType: ['renter', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      address: ['', Validators.required],
      dni: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  rolUser: any[] = [
    {name: 'RENTER', code: 'renter'},
    {name: 'OWNER', code: 'owner'},
    {name: 'MECHANIC', code: 'mechanic'},
  ];


  onSubmit(){
    const formData = {
      userName: this.signupForm.value.userName,
      userType: this.signupForm.getRawValue().userType,
      email:this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstname: this.signupForm.value.firstname,
      lastname: this.signupForm.value.lastname,
      address: this.signupForm.value.address,
      dni: this.signupForm.value.dni,
      phone:this.signupForm.value.phone,
    };
    console.log(this.signupForm.getRawValue());
  }
}
