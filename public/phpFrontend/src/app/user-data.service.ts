import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginToken } from './login/login.component';
import { Register } from './register/register.component';
import {constants} from "./constants"

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  public registerUser(user: Register): Observable<Register> {
    const url: string = environment.REST_API_BASE_URL+ "users";
    return this.http.post<Register>(url,user);
  }
  public login(user: Register): Observable<LoginToken> {
    const url: string = environment.REST_API_BASE_URL+ "login";
    return this.http.post<LoginToken>(url,user);
  }
}
