import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  //movieservice local bir servis olduğu için kullanabilmek için inject ediyoruz
  providers: [MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.movieService.getMovieById(params["movieId"]).subscribe(data => {
        this.movie = data;
      });
    });
  }
}
