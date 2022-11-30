import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { AlertifyService } from '../services/alertify.service';
import { CategoryService } from '../services/category.service';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit {
  
  categories: Category[];
  // ilk başta seçiniz gelmesi için model içerisine -1 değerini gönderiyoruz
  model: any = {
    categoryId: ""
  };
  

  constructor(private categoryService:CategoryService, private movieService:MovieService, private router:Router, private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  // eğer elementlere id verip buton ile parametre gönderseydik aşağıdaki komutları kullanabilirdik

  // createMovie(title:any, description:any, imageUrl:any, categoryId:any){

  //   if(title.value === "" || description.value === ""  || imageUrl.value === "" || categoryId.value === "-1"){
  //     this.alertify.error('Tüm bilgiler eksiksiz girilmelidir');
  //     return;
  //   }

  //   if(description.value.length < 20) {
  //     this.alertify.error("Açıklama için minimum 20 karakter girilmelidir");
  //     return;
  //   }

  //   // imageUrl olarak jpeg, jpg, png dışında resim yüklenememesi için aşağıdaki işlemleri yapıyoruz
  //   // split'ten sonra pop kullanarak uzantıyı alabiliriz (pop oluşturulan dizinin son elemanını alır -> örn; split yaptıktan sonra resim ["1"."jpeg"])
  //   // olarak ayrılır son eleman olan jpegi almak için pop kullanıyoruz)
  //   const extensions = ["jpeg", "jpg", "png"];
  //   const extension = imageUrl.value.split('.').pop();

  //   if(extensions.indexOf(extension) === -1){
  //     this.alertify.error("JPEG, JPG ve PNG dışında resim dosyaları yüklenemez");
  //     return;
  //   }

  //   const movie = { id:0, title: title.value, description: description.value, 
  //     imageUrl:imageUrl.value, isPopular: false, 
  //     datePublished: new Date().getTime(), categoryId:categoryId.value};

  //   this.movieService.createMovie(movie).subscribe(data => this.router.navigate(['/movies']));
  //   // veya navigate yaparken parametre verilip oluşturulan film açılabilir
  //   // this.movieService.createMovie(movie).subscribe(data => this.router.navigate(['/movies'], data.id));
  // }

  //ngSubmit ile createMovie'yi çalıştıracağımız için yukarıdaki yerine aşağıdaki komutları uyguluyoruz

  // eğer template driven form ile ekleme yapsaydık aşağıdaki kodları kullanabilirdik
  // createMovie(){
  //   const movie = {
  //     id: 0,
  //     title: this.model.title,
  //     description: this.model.description,
  //     imageUrl: this.model.imageUrl,
  //     isPopular: false,
  //     datePublished: new Date().getTime(),
  //     categoryId: this.model.categoryId
  //   };

  //   this.movieService.createMovie(movie).subscribe(data =>
  //     this.router.navigate(['/movies']));
  // }

  // reactive forms ile ilgili kodlar aşağıda bulunmaktadır
  movieForm = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
    description: new FormControl("", [Validators.required, Validators.minLength(20)]),
    imageUrl: new FormControl("", [Validators.required]),
    categoryId: new FormControl("", [Validators.required])
  });
  
  clearForm(){
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: ''
    });
  }

  createMovie(){
    const movie = {
      id: 0,
      title: this.movieForm.value.title,
      description: this.movieForm.value.description,
      imageUrl: this.movieForm.value.imageUrl,
      isPopular: false,
      datePublished: new Date().getTime(),
      categoryId: this.movieForm.value.categoryId
    };

    this.movieService.createMovie(movie).subscribe(data => this.router.navigate(['/movies']));
  }

  log(value: any){
    console.log(value);
  }
  
}
