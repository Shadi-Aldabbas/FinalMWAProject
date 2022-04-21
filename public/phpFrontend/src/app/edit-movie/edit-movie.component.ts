import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Movie } from '../Models/actor-module';
import { MoviesDataService } from '../movies-data.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @ViewChild('movieForm')
  movieForm!: NgForm;

  movie!:Movie;
  actorId!:string;
  movieId!:string;

  constructor(private route: ActivatedRoute,private moviesService: MoviesDataService,private _router:Router) { 
    this.movie = new Movie("","","")
  }

  ngOnInit(): void {
    this.actorId = this.route.snapshot.params["actorId"];
    this.movieId = this.route.snapshot.params["movieId"];
    this.getMovie();
  }
  getMovie():void{
    this.moviesService.getMovie(this.actorId,this.movieId).subscribe(movie => { this.movie = movie; });
  }
  
  editMovie(movieForm: NgForm): void {
    this.moviesService.updateMovie(this.actorId,this.movieId,movieForm.value).subscribe({
      next: (x) => console.log(`form submitted for id:${this.actorId} movieId: ${this.movieId}`,movieForm.value),
      error: err => console.log("err",err),
      complete: () => this._router.navigate([`actor/${this.actorId}/edit`])
    });
  }
}
