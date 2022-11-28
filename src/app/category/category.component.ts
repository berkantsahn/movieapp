import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit {
  
  categories: Category[] = [];
  // categoryRepository: CategoryRepository;
  selectedCategory : Category = null;

  constructor(private categoryService: CategoryService){
    // this.categoryRepository = new CategoryRepository;
    // this.categories = this.categoryRepository.getCategories();

  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  displayAll = true;

  selectCategory(category?:Category){
    if(category){
      this.selectedCategory = category;
      this.displayAll = false;
      //console.log(this.selectedCategory);
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
    
  }

  // categories:any = ["Macera", "Romantik", "Bilim Kurgu", "Komedi"];
  // categories: Category[] = [
  //   { id: 1, name:"Macera" },
  //   { id: 2, name:"Romantik" },
  //   { id: 3, name:"Bilim Kurgu" },
  //   { id: 4, name:"Komedi" }
  // ];
}
