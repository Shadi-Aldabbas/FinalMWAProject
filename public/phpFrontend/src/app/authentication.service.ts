import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  
  #isLoggedIn:boolean = false;
  get isLoggedIn(){return this.#isLoggedIn}
  set isLoggedIn(isLoggedIn){this.#isLoggedIn = isLoggedIn}
  
  set token(token:string){
    localStorage.setItem(environment.TOKEN_STORAGE, token);
    this.isLoggedIn = true;
  }
  get token(){return localStorage.getItem(environment.TOKEN_STORAGE) as string;}

  get userData(){return  this._jwtService.decodeToken(this.token)}
  
  get name(){
    let name:string = "Unknown"
    if (this.token) {
      name = this._jwtService.decodeToken(this.token).name as string;
    } 
    return name;
  }
  constructor(private _jwtService: JwtHelperService) { }

  deleteToken(){
    localStorage.clear(); 
    this.isLoggedIn = false;
  }
}
