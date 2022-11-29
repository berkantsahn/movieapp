import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';

//burada routes isimli bir obje tanımlayarak pathlerimizi belirtiyoruz
const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  //full parametresini girilen path'in tam olarak uyuşmasını istediğimiz durumlarda ekleyebiliriz
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies/category/:categoryId', component: MoviesComponent },
  { path: 'movies/:movieId', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
