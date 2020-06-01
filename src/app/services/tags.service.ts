import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  url = `${environment.apiUrl}tags`;

  constructor(
    private http: HttpClient
  ) { }

  getTags(): Observable<[]> {
    return this.http.get<[]>(this.url);
  }
}
