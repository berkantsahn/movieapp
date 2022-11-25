import { Movie } from "./movie";

export class MovieRepository {
    private movies: Movie[];
    
    //class içerisindeyse bir değişken tanımlarken boş olmasına karşın bir hata döndürür. Bunu engellemek için constructor tanımlamalıyız
    constructor(){
        this.movies = [
            { id: 1, title: "Film 1", description: "1- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eum molestiae culpa similique sunt inventore aut, quasi eveniet, architecto sint reprehenderit! Amet, illo voluptas! Suscipit minus facilis error dignissimos dolorum!", 
            imageUrl: "1.jpeg", isPopular: false, datePublished: new Date(1990,10,10)},
            { id: 2, title: "Film 2", description: "2- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eum molestiae culpa similique sunt inventore aut, quasi eveniet, architecto sint reprehenderit! Amet, illo voluptas! Suscipit minus facilis error dignissimos dolorum!", 
            imageUrl: "2.jpeg", isPopular: true, datePublished: new Date(1996,5,8)},
            { id: 3, title: "Film 3", description: "3- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eum molestiae culpa similique sunt inventore aut, quasi eveniet, architecto sint reprehenderit! Amet, illo voluptas! Suscipit minus facilis error dignissimos dolorum!", 
            imageUrl: "3.jpeg", isPopular: true, datePublished: new Date(1999,2,10)},
            { id: 4, title: "Film 4", description: "4- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur eum molestiae culpa similique sunt inventore aut, quasi eveniet, architecto sint reprehenderit! Amet, illo voluptas! Suscipit minus facilis error dignissimos dolorum!", 
            imageUrl: "4.jpeg", isPopular: true, datePublished: new Date(2003,8,5)},
            { id: 5, title: "Film 5", description: "5- Farklı bir açıklama", 
            imageUrl: "5.jpeg", isPopular: false, datePublished: new Date(2007,1,3)}
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