import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { constants } from './constants';
import { Actor } from './Models/actor-module';

@Injectable({
  providedIn: 'root'
})
export class ActorsDataService {

  constructor(private http: HttpClient, private _authService:AuthenticationService) { }
  private readonly baseUrl: string = environment.REST_API_BASE_URL;

  public getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.baseUrl + constants.ACTORS);
  }
  public getActor(id: string): Observable<Actor> {
    const url: string = this.baseUrl + constants.ACTORS+'/' + id;
    return this.http.get<Actor>(url);
  }
  public deleteActor(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + constants.ACTORS+'/' + id, {headers: new HttpHeaders().set(constants.AUTHORIZATION, constants.BAERAR + this._authService.token)});
  }

  public createActor(actor:Actor): Observable<any> {
    return this.http.post(`${this.baseUrl}${constants.ACTORS}`, actor, {headers: new HttpHeaders().set(constants.AUTHORIZATION, constants.BAERAR + this._authService.token)});
  }
  public updateActor(actor:Actor,actorId:string): Observable<any> {
    return this.http.put(`${this.baseUrl}${constants.ACTORS}/${actorId}`, actor, {headers: new HttpHeaders().set(constants.AUTHORIZATION, constants.BAERAR + this._authService.token)});
  }
}
