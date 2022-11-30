import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';

// burada routes isimli bir obje tanımlayarak pathlerimizi belirtiyoruz
// route yollarını belirtirken route önceliği vardır. Bu nedenle verdiğimiz pathlerin sırasına dikkat etmeliyiz
const routes: Routes = [
  { path: 'movies', component: MoviesComponent },
  //full parametresini girilen path'in tam olarak uyuşmasını istediğimiz durumlarda ekleyebiliriz
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies/category/:categoryId', component: MoviesComponent },
  { path: 'movies/create', component: MovieCreateComponent },
  { path: 'movies/:movieId', component: MovieDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }