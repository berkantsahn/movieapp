import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { Movie } from "../models/movie";

@Injectable()
export class MovieService {
    url = "http://localhost:3000/movies";

    //buraya kendi firebase urlnizi eklemelisiniz
    url_firebase = "https://angular-movie-app-4fca6-default-rtdb.firebaseio.com/";

    constructor(private http: HttpClient) {}

    // değer observable olarak alındığı için geriye dönen değerde observable olmalıdır
    getMovies(categoryId: number): Observable<Movie[]> {

        let newUrl = this.url_firebase + "movies.json";
        if(categoryId) {
            newUrl += '?categoryId=' + categoryId;
        }
        return this.http.get<Movie[]>(newUrl).pipe(
            // Gelen id bilgisini obje içindeki id ile değiştirmek için map kullanıyoruz
            map(response => {
                const movies: Movie[] = []
                for(const key in response) {
                    movies.push({...response[key], id: key});
                }
                return movies;
            }),
            tap(data => console.log(data)),
            catchError(this.handleError));
    }

    getMovieById(movieId: number): Observable<Movie> {
        return this.http.get<Movie>(this.url + "/" + movieId).pipe(tap(data => console.log(data)),
        catchError(this.handleError));
    }

    // create component içerisinde oluşturulan createMovie buraya bilgileri gönderir
    createMovie(movie: Movie): Observable<Movie> {

        // altta header gönderme örneği mevcuttur. Header içerisinde bir token bilgisi gönderilebilir.
        // örneğin üye girişi yaparken authorization yapılacaksa header ile token gönderilerek yetkilendirme işlemi yapılabilir
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                'Authorization':'Token'
            })
        }

        return this.http.post<Movie>(this.url_firebase + "/movies.json", movie, httpOptions).pipe(tap(data => console.log(data)),
        catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse){
        
        if(error.error instanceof ErrorEvent) {
            // client ya da network ile ilgili
            console.log("Error: " + error.error.message);
        } else {
            // api veya back-end ile ilgili
            switch(error.status) {
                case 404: console.log("404 Not Found");
                break;
                case 403: console.log("403 Access Denied");
                break;
                case 500: console.log("500 Interval Server");
                break;
                default: console.log("Bir şeyler yanlış gitti.");
                break;
            }
        }

        return throwError("Beklenmedik bir hata oluştu.");
    }
}