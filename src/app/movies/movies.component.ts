import { AbstractType, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from './movie-model';
import { MovieRepository } from './movie.repository';
import { AlertifyService } from '../shared/alertify.service';
import { AuthService } from '../auth/auth.service';
import { MovieService } from './movie.service';

//alertify lib kullanmak için tanımlama yaptık. Global bir alertify servis oluşturduğumuz için buradan kaldırıyoruz
//declare let alertify: any;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {

  title:string = "Film Listesi"

  // referans olarak boş değer gönderiyoruz
  movies: Movie[] = [] ;
  filteredMovies: Movie[] = [];
  userId:string;
  movieList:string[] = [];
  //pipe yerine event kullanılarak filtremele işlemi yapıldığı için açıklama satırına alındı
  //popularMovies: Movie[];

  // db.json içerisinden verileri çekeceğimiz için movieRepository değişkenine ihtiyacımız kalmadı bu nedenle yorum satırına alındı
  //movieRepository: MovieRepository;
  //today = new Date();
  
  filterText: string = "";
  error:any;
  loading: boolean = false;

  // oluşturduğumuz alertify servisi constructor içerisinde alertify servisi inject ettik
  // db.json içerisinden veri çekeceğimiz için httpClient tanımlaması yaptık
  // url yapılandırmasını yapabilmek için activatedRoot isimli parametre constructor içerisine inject edilmelidir
  constructor(private alertify: AlertifyService, private movieService: MovieService,
    private activatedRoute: ActivatedRoute, private authService: AuthService){
    // db.json içerisinden verileri çekeceğimiz için buradaki movieRepository ve movies tanımlamalarını yorum satırına alındı
    // this.movieRepository = new MovieRepository();
    // this.movies = this.movieRepository.getMovies();
    //this.filteredMovies = this.movies;
    //this.popularMovies = this.movieRepository.getPopularMovies();
  }

  // ngOnInit component oluşturulduktan fakat çağırılmadan önce çalıştırılır. Bu nedenle json içerisinden Movie'ye bir referans verilmesi gerekmektedir.
  // (burada örnek Movie üzerinden yapıldığı için referans verilmesi gereken Movie'dir)
  // Referansı tanımlama aşamasında (yukarıda) veriyoruz. (içerisine boş bir değer gönderiyoruz)
  ngOnInit(): void {
    //userId içerisine user bilgisini almak için aşağıdaki komutu kullandık
    this.authService.user.subscribe(user => {
      if(user){
        this.userId = user.id

      //getMovies içerisine urlyi parametre olarak gönderebilmek için activatedRoot parametresi kullanılır
      this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      this.movieService.getMovies(params["categoryId"]).subscribe(data => {
      this.movies = data;
      this.filteredMovies = this.movies;
      this.movieService.getList(this.userId).subscribe(data => {
          this.movieList = data;
          console.log(this.movieList);
        });
        this.loading = false;
      }, error => { this.error = error;
      this.loading = false; });
    }); 
      }    
    });
    // aşağıdaki kodlar kullanılmak istenirse constructor içerisine httpClient tanımlaması yapılmalıdır
    // httpclient işlemleri service içerisine taşındığı için burada açıklama satırına alınmıştır
    // gelen sonuç observable bir değerdir
    // this.http.get<Movie[]>("http://localhost:3000/movies").subscribe(data => {
    //   this.movies = data;
    //   this.filteredMovies = this.movies;
    // });

    // aşağıda internette bulunan bir json dosyasından veri çekme işlemi gösterilmiştir
    // this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data => {
    //   console.log(data);
    // });

    
  }

  getButtonState(movie:Movie){
    return this.movieList.findIndex(m => m === movie.id) > -1 
  }

  onInputChange(){
    console.log(this.filterText);
    this.filteredMovies = this.filterText? this.movies.filter(m => m.title.toLowerCase().indexOf(this.filterText) !== -1 || 
    m.description.toLowerCase().indexOf(this.filterText) !== -1): this.movies;
  }



  addToList($event: any, movie: Movie){
    //gönderilen event bilgisi (tıklanan buton) class listesine ulaş ve btn btn-primary ise
    //btn-primary'i sil ve btn-danger'i ekle ve yazıyı listeden çıkar olarak değiştir.
    if($event.target.classList.contains('btn-dark')){
      $event.target.innerText = "Listeden Çıkar";
      $event.target.classList.remove('btn-dark');
      $event.target.classList.add('btn-danger');

      this.movieService.addToMyList({userId: this.userId, movieId: movie.id}).subscribe(() => 
      //alertify servisi inject ettikten sonra alttaki kullanımı bir altındaki gibi değiştiriyoruz
      //alertify.success(movie.title + " listene eklendi");
      this.alertify.success(movie.title + " listene eklendi"));      
    }
    else {
      $event.target.innerText = "Listeye Ekle";
      $event.target.classList.remove('btn-danger');
      $event.target.classList.add('btn-dark');

      this.movieService.removeFromList({userId: this.userId, movieId: movie.id}).subscribe(() =>
      this.alertify.success(movie.title + " listenden çıkartıldı"));
      //alertify.error(movie.title + " listenden çıkartıldı"); 
      
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
