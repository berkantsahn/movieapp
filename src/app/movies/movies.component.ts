import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieRepository } from '../models/movie.repository';
import { AlertifyService } from '../services/alertify.service';

//alertify lib kullanmak için tanımlama yaptık. Global bir alertify servis oluşturduğumuz için buradan kaldırıyoruz
//declare let alertify: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title:string = "Film Listesi"
  movies: Movie[];
  filteredMovies: Movie[];
  //pipe yerine event kullanılarak filtremele işlemi yapıldığı için açıklama satırına alındı
  //popularMovies: Movie[];
  movieRepository: MovieRepository;
  today = new Date();
  
  filterText: string = "";

  //oluşturduğumuz alertify servisi constructor içerisinde alertify servisi inject ettik
  constructor(private alertify: AlertifyService){
    this.movieRepository = new MovieRepository();
    this.movies = this.movieRepository.getMovies();
    this.filteredMovies = this.movies;
    //this.popularMovies = this.movieRepository.getPopularMovies();
  }

  ngOnInit(): void {
    
  }

  onInputChange(){
    console.log(this.filterText);
    this.filteredMovies = this.filterText? this.movies.filter(m => m.title.toLowerCase().indexOf(this.filterText) !== -1 || 
    m.description.toLowerCase().indexOf(this.filterText) !== -1): this.movies;
  }

  addToList($event: any, movie: Movie){
    //gönderilen event bilgisi (tıklanan buton) class listesine ulaş ve btn btn-primary ise
    //btn-primary'i sil ve btn-danger'i ekle ve yazıyı listeden çıkar olarak değiştir.
    if($event.target.classList.contains('btn-primary')){
      $event.target.innerText = "Listeden Çıkar";
      $event.target.classList.remove('btn-primary');
      $event.target.classList.add('btn-danger');
      //alertify servisi inject ettikten sonra alttaki kullanımı bir altındaki gibi değiştiriyoruz
      //alertify.success(movie.title + " listene eklendi");
      this.alertify.success(movie.title + " listene eklendi");
    }
    else {
      $event.target.innerText = "Listeye Ekle";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-primary');
      //alertify.error(movie.title + " listenden çıkartıldı"); 
      this.alertify.success(movie.title + " listenden çıkartıldı");
    }
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
