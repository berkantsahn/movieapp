import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


// burada routes isimli bir obje tanımlayarak pathlerimizi belirtiyoruz
// route yollarını belirtirken route önceliği vardır. Bu nedenle verdiğimiz pathlerin sırasına dikkat etmeliyiz
const routes: Routes = [
  //full parametresini girilen path'in tam olarak uyuşmasını istediğimiz durumlarda ekleyebiliriz
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  //lazy loading işlemlerini gerçekleştirdik ve app-module içerisinden alttaki modülleri sildik
  { path: 'movies', loadChildren: () => import('./movies/movies.module').then(m => m.MoviesModule) },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy:PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
