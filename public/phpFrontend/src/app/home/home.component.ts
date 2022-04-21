import { Component, HostListener, OnInit } from '@angular/core';
import { ActorsDataService } from '../actors-data.service';
import { Actor } from '../Models/actor-module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actors: Actor[] = [];

  done:boolean = false;
  

  constructor(private actorsService: ActorsDataService) {
  console.log("56723423984734230294208438432987343872984!!!!!@#$%^&*");
   }
  
   @HostListener('copy', ['$event']) blockCopy(e: KeyboardEvent) {
     if(!this.done){
       alert("copy and paste are NOT allowed");
       alert("Just Kidding here is the password:  56723423984734230294208438432987343872984!!!!!@#$%^&*");
       e.preventDefault();
      //  this.done = true;
     }
  }
  @HostListener('cut', ['$event']) blockCut(e: KeyboardEvent) {
    if(!this.done){
      e.preventDefault();
      // this.done = true;
    }
  }

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
