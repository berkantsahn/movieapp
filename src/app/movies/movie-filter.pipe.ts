import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from './movie-model';

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  //parantez içerisine parametler alınır. :'dan sonra ki belirtilen obje geri döndürülecek değer ile ilgilidir.
  transform(movies: Movie[], filterText:string): Movie[] {
    filterText = filterText.toLowerCase();
    // console.log(filterText);
    // console.log(movies);

    //eğer filterText varsa movies.filter'i çalıştır diyoruz
    //m isimli Movies türünde bir değişken tanımlayıp title bilgisini küçük harfe dönüştürüyoruz
    //sonrasında indexOf komutu ile filterText'ten gelen değeri aratıyoruz ve sonuç -1 değilse (yani filterText ile bir film ismi uyuşuyorsa)
    //filtrelenmiş değeri geri döndürme işlemi yapıyoruz
    // || ifadesiyle aynı işlemleri description içinde yapıyoruz
    return filterText? movies.filter((m: Movie) => 
    m.title.toLowerCase().indexOf(filterText) !== -1 || m.description.toLowerCase().indexOf(filterText) !== -1): movies;
  }
}
