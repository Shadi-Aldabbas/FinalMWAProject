import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ActorsDataService } from '../actors-data.service';
import { AuthenticationService } from '../authentication.service';
import { Actor } from '../Models/actor-module';

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {

  get isLoggedIn() { return this._authService.isLoggedIn }


  actor!: Actor;
  actorId!:string;
  constructor(private route: ActivatedRoute,private _authService:AuthenticationService, private actorsService: ActorsDataService, private _router: Router) {
    this.actor = new Actor("", "","");
  }
  ngOnInit(): void {
    this.actorId = this.route.snapshot.params["actorId"];
    this.getActor();
  }
  getActor():void{
    this.actorsService.getActor(this.actorId).subscribe(actor => { this.actor = actor; });

  }
  delete(_id: string): void {
    this.actorsService.deleteActor(_id).subscribe({
      next: res => console.log("res", res),
      error: err => console.log(err),
      complete: () => {
        this._router.navigate(['actor']);
      }
    })
  }
}
