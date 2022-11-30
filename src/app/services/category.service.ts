import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable()
export class CategoryService {
    url = "http://localhost:3000/categories";
    url_firebase = "https://angular-movie-app-4fca6-default-rtdb.firebaseio.com/";

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.url_firebase + 'categories.json').pipe(         
            map(response => {
                const categories: Category [] = [];
                for(const key in response) {
                    categories.push({...response[key], id: key});
                }
                return categories;
            })
        );
    }

    createCategory(category: Category): Observable<Category>{
        return this.http.post<Category>(this.url_firebase + 'categories.json', category);
    }
}