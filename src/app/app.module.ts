import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './services/error.interceptor';
import { AlertComponent } from './shared/alert/alert.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { MoviesModule } from './movies/movies.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [ //Componentlerin eklendiği bölüm
    AppComponent,
    NavbarComponent, 
    FooterComponent,
    AlertComponent,
    LoadingComponent
  ],
  imports: [ //Modulelerin eklendiği bölüm
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MoviesModule,
    AuthModule
  ],
  providers: [AlertifyService, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true }, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true }], //Serviceslerin eklendiği bölüm. Eğer serviceler burada tanımlanırsa global sadece component içerisinde tanımlanırsa yerel olur
  bootstrap: [AppComponent] //Starter Component
})
export class AppModule { }
