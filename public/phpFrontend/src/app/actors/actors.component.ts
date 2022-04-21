import { Component, OnInit } from '@angular/core';

import { ActorsDataService } from '../actors-data.service';
import { AuthenticationService } from '../authentication.service';
import { Actor } from '../Models/actor-module';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {

  get isLoggedIn() { return this._authService.isLoggedIn }



  searchTerm!: string;
  actors!: Actor[]
  term!: string;

  constructor(private actorsService: ActorsDataService, private _authService:AuthenticationService) { }
  
  ngOnInit(): void {
    this.getActors();
  }

  getActors(): void {
    this.actorsService.getActors().subscribe({
      next: actors => this.actors = actors,
      error: err => console.log(err),
      complete: () => console.log("got actors", this.actors)
    });
  }
  search(value: string): void {
    this.actors = this.actors.filter((val) => val.name.toLowerCase().includes(value));
  }
}
