import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { Actor } from './Models/actor-module';

@Injectable({
  providedIn: 'root'
})
export class ActorsDataService {

  constructor(private http: HttpClient, private _authService:AuthenticationService) { }
  private readonly baseUrl: string = environment.REST_API_BASE_URL;

  public getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.baseUrl + 'actors');
  }
  public getActor(id: string): Observable<Actor> {
    const url: string = this.baseUrl + 'actors/' + id;
    return this.http.get<Actor>(url);
  }
  public deleteActor(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'actors/' + id, {headers: new HttpHeaders().set('Authorization', 'Baerar ' + this._authService.token)});
  }

  public createActor(actor:Actor): Observable<any> {
    return this.http.post(`${this.baseUrl}actors`, actor, {headers: new HttpHeaders().set('Authorization', 'Baerar ' + this._authService.token)});
  }
  public updateActor(actor:Actor,actorId:string): Observable<any> {
    return this.http.put(`${this.baseUrl}actors/${actorId}`, actor, {headers: new HttpHeaders().set('Authorization', 'Baerar ' + this._authService.token)});
  }
}
