import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CategoryComponent } from './category/category.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movies/movie/movie.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';
import { FooterComponent } from './footer/footer.component';
import { SummaryPipe } from './pipes/summary.pipe';
import { FormsModule } from '@angular/forms';
import { MovieFilterPipe } from './pipes/movie-filter.pipe';
import { AlertifyService } from './services/alertify.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ //Componentlerin eklendiği bölüm
    AppComponent,
    NavbarComponent,
    CategoryComponent,
    MoviesComponent,
    MovieComponent,
    MovieDetailsComponent,
    FooterComponent,
    SummaryPipe,
    MovieFilterPipe
  ],
  imports: [ //Modulelerin eklendiği bölüm
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AlertifyService], //Serviceslerin eklendiği bölüm. Eğer serviceler burada tanımlanırsa global sadece component içerisinde tanımlanırsa yerel olur
  bootstrap: [AppComponent] //Starter Component
})
export class AppModule { }
