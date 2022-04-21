import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  errorMsg: string = "";
  successMsg: string = "";


  #registrationForm!: FormGroup;
  get registrationForm() { return this.#registrationForm }


  constructor(private userService: UserDataService, private _router: Router, private _formBuilder: FormBuilder, private _authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.#registrationForm = this._formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  onSubmit(registrationForm: FormGroup) {
    let newUser: Register = new Register();
    if (newUser.fillFromForm(this.registrationForm)) {
      this.userService.registerUser(newUser).subscribe({
        next: (x) => this.successMsg = "created successfully",
        error: err => console.log("err", err),
        // complete: () => this._router.navigate(['actor'])
      });
    } else {
      this.successMsg = "";
      this.errorMsg = "passwords are not the same";
      console.log("not same passwords");

    }
  }
  userCreated() {
    this.errorMsg = "";
    this.successMsg = "created successfully";
  }
}

export class Register {
  name!: string;
  username!: string;
  password!: string;

  public fillFromForm = (form: FormGroup | NgForm): boolean => {
    this.name = form.value.name;
    this.username = form.value.username;
    this.password = form.value.password;
    return form.value.password === form.value.repeatPassword;
  }

}
