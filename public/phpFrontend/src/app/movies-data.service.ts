import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import {  Movie } from './Models/actor-module';
import { constants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

  constructor(private http: HttpClient, private _authService: AuthenticationService) { }
  private readonly baseUrl: string = environment.REST_API_BASE_URL;
  public getMovies(actorId:string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}${constants.ACTORS}/${actorId}/${constants.MOVIES}`);
  }
  public getMovie(actorId:string,movieId: string): Observable<Movie> {
    const url: string = `${this.baseUrl}${constants.ACTORS}/${actorId}/${constants.MOVIES}/${movieId}`;
    return this.http.get<Movie>(url);
  }
  public deleteMovie(actorId:string,movieId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${constants.ACTORS}/${actorId}/${constants.MOVIES}/${movieId}` ,  {headers: new HttpHeaders().set(constants.AUTHORIZATION, constants.BAERAR + this._authService.token)});
  }
  public createMovie(actorId:string,movie:Movie): Observable<any> {
    return this.http.post(`${this.baseUrl}${constants.ACTORS}/${actorId}/${constants.MOVIES}`, movie,  {headers: new HttpHeaders().set(constants.AUTHORIZATION, constants.BAERAR + this._authService.token)});
  }
  public updateMovie(actorId:string,movieId:string,movie:Movie): Observable<any> {
    return this.http.put(`${this.baseUrl}${constants.ACTORS}/${actorId}/${constants.MOVIES}/${movieId}`, movie, {headers: new HttpHeaders().set(constants.AUTHORIZATION, constants.BAERAR + this._authService.token)});
  }

}
