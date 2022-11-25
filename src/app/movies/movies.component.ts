import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title:string = "Film Listesi"
  movies: Movie[];
  popularMovies: Movie[];
  movieRepository: MovieRepository;

  constructor(){
    this.movieRepository = new MovieRepository();
    this.movies = this.movieRepository.getMovies();
    this.popularMovies = this.movieRepository.getPopularMovies();
  }

  ngOnInit(): void {
    
  }

  // movies:any = [
  //   { id: 1, title: "Film 1", description: "Film 1 Açıklama", imageUrl: "1.jpeg"},
  //   { id: 2, title: "Film 2", description: "Film 2 Açıklama", imageUrl: "2.jpeg"},
  //   { id: 3, title: "Film 3", description: "Film 3 Açıklama", imageUrl: "3.jpeg"},
  //   { id: 4, title: "Film 4", description: "Film 4 Açıklama", imageUrl: "4.jpeg"}
  // ];

  //burada tanımlayabilirdik fakat oluşturduğumuz repository içinden çekme işlemi gerçekleştireceğiz
  // movies: Movie[] = [
  //   { id: 1, title: "Film 1", description: "Film 1 Açıklama", imageUrl: "1.jpeg"},
  //   { id: 2, title: "Film 2", description: "Film 2 Açıklama", imageUrl: "2.jpeg"},
  //   { id: 3, title: "Film 3", description: "Film 3 Açıklama", imageUrl: "3.jpeg"},
  //   { id: 4, title: "Film 4", description: "Film 4 Açıklama", imageUrl: "4.jpeg"} 
  // ];
}
