import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryRepository } from '../models/category.repository';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  categories: Category[];
  categoryRepository: CategoryRepository;

  constructor(){
    this.categoryRepository = new CategoryRepository;
    this.categories = this.categoryRepository.getCategories();
  }

  ngOnInit(): void {
    
  }

  // categories:any = ["Macera", "Romantik", "Bilim Kurgu", "Komedi"];
  // categories: Category[] = [
  //   { id: 1, name:"Macera" },
  //   { id: 2, name:"Romantik" },
  //   { id: 3, name:"Bilim Kurgu" },
  //   { id: 4, name:"Komedi" }
  // ];
}
