import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from '../register/register.component';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';


export class LoginToken{
  success:boolean = false;
  token:string = "";

}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  get isLoggedIn() { return this._authService.isLoggedIn }

  get name() { return this._authService.name; }

  @ViewChild('loginForm')
  loginForm!: NgForm;

  credentials!: Register;

  constructor(private userService: UserDataService,  private _authService: AuthenticationService, private _router:Router) { }

  ngOnInit(): void {
    this.credentials = new Register();
    this.credentials.username = "";
    this.credentials.password = "";

    setTimeout(() => { this.loginForm.setValue(this.credentials); }, 0)

  }

  logout() {
    this._authService.deleteToken()
  }
  login(loginResponse:LoginToken){
    console.log(loginResponse);
    this._authService.token = loginResponse.token;
    this._router.navigate(["/"]);
  }
  onSubmit(loginForm: NgForm): void {
    let user: Register = new Register();
    user.fillFromForm(loginForm);
    this.userService.login(user).subscribe({
      next: (loginResponse) => this.login(loginResponse),
      error: (err) => {
        console.log("error", err);

      }
    })

  }
  reset(form: NgForm) { }

}
