import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ActorsDataService } from '../actors-data.service';
import { Actor, Movie } from '../Models/actor-module';
import { MoviesDataService } from '../movies-data.service';

@Component({
  selector: 'app-edit-actor',
  templateUrl: './edit-actor.component.html',
  styleUrls: ['./edit-actor.component.css']
})
export class EditActorComponent implements OnInit {

  @ViewChild('actorForm')
  actorForm!: NgForm;

  actor!:Actor;
  movie!:Movie;
  actorId!:string;

  constructor(private route: ActivatedRoute,private actorService:ActorsDataService,private _router:Router) { 
    this.actor = new Actor("","","")
  }

  ngOnInit(): void {
    this.actorId = this.route.snapshot.params["actorId"];
    this.getActors();
  }
  getActors():void{
    this.actorService.getActor(this.actorId).subscribe(actor => { this.actor = actor; });
  }
  
  editActor(actorForm: NgForm): void {
    const actorId = this.route.snapshot.params["actorId"];
    actorForm.value.movies = this.actor.movies;
    this.actorService.updateActor(actorForm.value,this.actorId).subscribe({
      next: (x) => console.log(`form submitted for id:${actorId}`,actorForm.value),
      error: err => console.log("err",err),
      complete: () => this._router.navigate([`actor/${actorId}`])
    });
  }
  

}
