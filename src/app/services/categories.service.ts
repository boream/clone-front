import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = `${environment.apiUrl}categories`;

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<[]> {
    return this.http.get<[]>(this.url)
  }
}
