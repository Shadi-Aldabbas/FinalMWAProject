import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../Models/actor-module';
import { MoviesDataService } from '../movies-data.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movie!: Movie;
  actorId!: string;
  constructor(private route: ActivatedRoute, private moviesService: MoviesDataService, private _router: Router) {
    this.movie = new Movie("", "","");
  }
  ngOnInit(): void {
    const actorId:string = this.route.snapshot.params["actorId"];
    const movieId = this.route.snapshot.params["movieId"];
    this.moviesService.getMovie(actorId,movieId).subscribe(movie => { this.movie = movie;
    this.actorId = actorId;
    });
  }
  delete(actorId: string,movieId: string): void {
    this.moviesService.deleteMovie(actorId,movieId).subscribe({
      next: res => console.log("res", res),
      error: err => console.log(err),
      complete: () => {
        this._router.navigate([`actor/${actorId}/edit`]);
      }
    })
  }
}
