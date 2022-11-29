import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Movie } from "../models/movie";

@Injectable()
export class MovieService {
    url = "http://localhost:3000/movies";

    constructor(private http: HttpClient) {}

    // değer observable olarak alındığı için geriye dönen değerde observable olmalıdır
    getMovies(categoryId: number): Observable<Movie[]> {

        let newUrl = this.url;
        if(categoryId) {
            newUrl += '?categoryId=' + categoryId;
        }
        return this.http.get<Movie[]>(newUrl).pipe(tap(data => console.log(data)),
        catchError(this.handleError));
    }

    getMovieById(movieId: number): Observable<Movie> {
        return this.http.get<Movie>(this.url + "/" + movieId).pipe(tap(data => console.log(data)),
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