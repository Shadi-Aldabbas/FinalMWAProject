import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ActorComponent } from './actor/actor.component';
import { ActorsComponent } from './actors/actors.component';
import { MovieComponent } from './movie/movie.component';
import { ErrorPageComponentComponent } from './error-page-component/error-page-component.component';
import { AddActorComponent } from './add-actor/add-actor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditActorComponent } from './edit-actor/edit-actor.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ActorComponent,
    ActorsComponent,
    MovieComponent,
    ErrorPageComponentComponent,
    AddActorComponent,
    EditActorComponent,
    EditMovieComponent,
    AddMovieComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot([
      {
      path: "",
      component: HomeComponent
      },
      {
      path: "actor",
      component: ActorsComponent
      },
      {
      path: "actor/add",
      component: AddActorComponent
      },
      {
      path: "actor/:actorId",
      component: ActorComponent
      },
      {
      path: "actor/:actorId/edit",
      component: EditActorComponent
      },
      {
      path: "actor/:actorId/addMovie",
      component: AddMovieComponent
      },
      {
      path: "actor/:actorId/movies/:movieId",
      component: MovieComponent
      },
      {
      path: "actor/:actorId/movies/:movieId/edit",
      component:EditMovieComponent
      },
      {
      path: "**",
      component: ErrorPageComponentComponent
      }
      ])
      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
