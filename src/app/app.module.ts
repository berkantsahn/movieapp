import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';


@NgModule({
  declarations: [ //Componentlerin eklendiği bölüm
    AppComponent,
    NavbarComponent, 
    FooterComponent
  ],
  imports: [ //Modulelerin eklendiği bölüm
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    //MoviesModule,
    //AuthModule,
    SharedModule,
    CoreModule
  ],
  providers: [], //Serviceslerin eklendiği bölüm. Eğer serviceler burada tanımlanırsa global sadece component içerisinde tanımlanırsa yerel olur
  bootstrap: [AppComponent] //Starter Component
})
export class AppModule { }
