import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  get isLoggedIn() { return this._authService.isLoggedIn }

  constructor(private _router:Router, private _authService:AuthenticationService) { }

  ngOnInit(): void {
  }
  onHome():void{
    this._router.navigate(['']);
  }
  onActor():void{
    this._router.navigate(['actor']);
  }
  onRegister():void{
    this._router.navigate(['register']);
  }
  onProfile():void{
    this._router.navigate(['profile']);
  }
}
