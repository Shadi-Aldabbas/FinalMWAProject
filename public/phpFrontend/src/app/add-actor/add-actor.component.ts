import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ActorsDataService } from '../actors-data.service';
import { Actor, Movie } from '../Models/actor-module';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css']
})
export class AddActorComponent implements OnInit {

  @ViewChild('actorForm')
  actorForm!: NgForm;

  actor!:Actor;
  movie!:Movie;

  constructor(private actorService:ActorsDataService,private _router:Router) { 
    this.actor = new Actor("","","");
  }

  ngOnInit(): void {
  }
  addActor(actorForm: NgForm): void {
    console.log("called", actorForm.value);
    this.actorService.createActor(actorForm.value).subscribe({
      next: (x) => console.log("form submitted",x),
      error: err => console.log("err",err),
      complete: () => this._router.navigate(['actor'])
    });
  }
  

}
