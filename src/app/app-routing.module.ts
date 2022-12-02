import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { CategoryComponent } from './category/category.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { MoviesHomeComponent } from './movies/movies-home/movies-home.component';

// burada routes isimli bir obje tanımlayarak pathlerimizi belirtiyoruz
// route yollarını belirtirken route önceliği vardır. Bu nedenle verdiğimiz pathlerin sırasına dikkat etmeliyiz
const routes: Routes = [
  //full parametresini girilen path'in tam olarak uyuşmasını istediğimiz durumlarda ekleyebiliriz
  { path: '', redirectTo: 'movies', pathMatch: 'full' },

  { 
    path: 'movies',
    component: MoviesHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MoviesComponent }, 
      { path: 'category/:categoryId', component: MoviesComponent },
      { path: 'create', component: MovieCreateComponent },
      { path: ':movieId', component: MovieDetailsComponent },
    ]
  },
  { path: 'categories/create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
