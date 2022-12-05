import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';


// burada routes isimli bir obje tanımlayarak pathlerimizi belirtiyoruz
// route yollarını belirtirken route önceliği vardır. Bu nedenle verdiğimiz pathlerin sırasına dikkat etmeliyiz
const routes: Routes = [
  //full parametresini girilen path'in tam olarak uyuşmasını istediğimiz durumlarda ekleyebiliriz
  { path: '', redirectTo: 'movies', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
