import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Register } from '../register/register.component';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


export class LoginToken {
  success: boolean = false;
  token: string = "";

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

  done: boolean = false;

  constructor(private userService: UserDataService, private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    this.credentials = new Register();
    this.credentials.username = "";
    this.credentials.password = "";

    // setTimeout(() => { this.loginForm.setValue(this.credentials); }, 0)

  }
  @HostListener("paste", ['$event']) blockPaste(e: KeyboardEvent) {
    if (!this.done) {
      alert(environment.PASTE_MSG_ONE);
      alert(environment.PASTE_MSG_TWO);
      alert(environment.PASTE_MSG_THREE);
      e.preventDefault();
      this.done = true;
    }
  }
  logout() {
    this._authService.deleteToken();
    this._router.navigate([""]);
  }
  login(loginResponse: LoginToken) {
    console.log(loginResponse);
    this._authService.token = loginResponse.token;
    this._router.navigate(["/actor"]);
  }
  onSubmit(loginForm: NgForm): void {
    let user: Register = new Register();
    if (!user.fillFromForm(loginForm))
      this.userService.login(user).subscribe({
        next: (loginResponse) => this.login(loginResponse),
        error: (err) => {console.log("error", err);
        

        }
      })

  }
  reset(form: NgForm) { }

}
