import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Actor } from './Models/actor-module';

@Injectable({
  providedIn: 'root'
})
export class ActorsDataService {

  constructor(private http: HttpClient) { }
  // private readonly baseUrl: string = 'http://localhost:3000/api/actors/:actorId/movies/:movieId';
  private readonly baseUrl: string = environment.REST_API_BASE;

  public getActors(): Observable<Actor[]> {
    return this.http.get<Actor[]>(this.baseUrl + 'actors');
  }
  public getActor(id: string): Observable<Actor> {
    const url: string = this.baseUrl + 'actors/' + id;
    return this.http.get<Actor>(url);
  }
  public deleteActor(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'actors/' + id);
  }

  public createActor(actor:Actor): Observable<any> {
    return this.http.post(`${this.baseUrl}actors`, actor);
  }
  public updateActor(actor:Actor,actorId:string): Observable<any> {
    return this.http.put(`${this.baseUrl}actors/${actorId}`, actor);
  }
}
