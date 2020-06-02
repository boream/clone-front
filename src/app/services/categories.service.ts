import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Category } from '../types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesUrl = `${environment.apiUrl}categories`

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<Category[]>(`${this.categoriesUrl}`);
  }
}
