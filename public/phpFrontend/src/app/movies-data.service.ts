import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Movie } from './Models/actor-module';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  constructor(private http: HttpClient) { }
  // private readonly baseUrl: string = 'http://localhost:3000/api/actors/:actorId/movies/:movieId';
  private readonly baseUrl: string = environment.REST_API_BASE;
  public getMovies(actorId:string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}actors/${actorId}/movies`);
  }
  public getMovie(actorId:string,movieId: string): Observable<Movie> {
    const url: string = `${this.baseUrl}actors/${actorId}/movies/${movieId}`;
    return this.http.get<Movie>(url);
  }
  public deleteMovie(actorId:string,movieId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}actors/${actorId}/movies/${movieId}`);
  }
  public createMovie(actorId:string,movie:Movie): Observable<any> {
    return this.http.post(`${this.baseUrl}actors/${actorId}/movies`, movie);
  }
  public updateMovie(actorId:string,movieId:string,movie:Movie): Observable<any> {
    return this.http.put(`${this.baseUrl}actors/${actorId}/movies/${movieId}`, movie);
  }

}
