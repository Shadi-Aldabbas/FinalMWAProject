import { Component, OnInit } from '@angular/core';
import { ActorsDataService } from '../actors-data.service';
import { Actor } from '../Models/actor-module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actors: Actor[] = [];

  constructor(private actorsService: ActorsDataService) { }
  
  ngOnInit(): void {
    this.getActors();
  }

  getActors(): void {
    this.actorsService.getActors().subscribe({
      next: actors => this.actors = actors,
      error: err => console.log(err),
      complete: () => console.log("got actors", this.actors)
    });
  }
  deleteOne(_id: string): void {
    this.actorsService.deleteActor(_id).subscribe({
      next: res => console.log("res", res),
      error: err => console.log(err),
      complete: () => {
        this.actors = this.actors.filter(x => x._id != _id);
        this.getActors();
      }
    })
  }

}
