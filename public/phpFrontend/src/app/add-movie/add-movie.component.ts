import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../Models/actor-module';
import { MoviesDataService } from '../movies-data.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  @ViewChild('movieForm')
  movieForm!: NgForm;

  movie!:Movie;
  actorId!:string;

  constructor(private route: ActivatedRoute,private movieService:MoviesDataService,private _router:Router) { 
    this.movie = new Movie("","","");
  }

  ngOnInit(): void {
    this.actorId = this.route.snapshot.params["actorId"];

  }
  addMovie(movieForm: NgForm): void {
    console.log("called", movieForm.value);
    this.movieService.createMovie(this.actorId,movieForm.value).subscribe({
      next: (x) => console.log("form submitted",x),
      error: err => console.log("err",err),
      complete: () => this._router.navigate([`actor/${this.actorId}/edit`])
    });
  }

}
