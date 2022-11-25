import { Movie } from "./movie";

export class MovieRepository {
    private movies: Movie[];
    
    //class içerisindeyse bir değişken tanımlarken boş olmasına karşın bir hata döndürür. Bunu engellemek için constructor tanımlamalıyız
    constructor(){
        this.movies = [
            { id: 1, title: "Film 1", description: "Film 1 Açıklama", imageUrl: "1.jpeg", isPopular: false},
            { id: 2, title: "Film 2", description: "Film 2 Açıklama", imageUrl: "2.jpeg", isPopular: true},
            { id: 3, title: "Film 3", description: "Film 3 Açıklama", imageUrl: "3.jpeg", isPopular: true},
            { id: 4, title: "Film 4", description: "Film 4 Açıklama", imageUrl: "4.jpeg", isPopular: true},
            { id: 5, title: "Film 5", description: "Film 5 Açıklama", imageUrl: "5.jpeg", isPopular: false}
          ];
    }

    getMovies(): Movie[]{
        return this.movies;
    }

    getPopularMovies(): Movie[]{
        return this.movies.filter(i => i.isPopular);
    }

    //hatayı engellemek için tsconfig.json'da lib'in altına "strictNullChecks": false komutunu ekliyoruz
    getMovieById(id: number): Movie {
        return this.movies.find(i => i.id == id);
    }
}