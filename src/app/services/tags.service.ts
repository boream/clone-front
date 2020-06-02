import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../types/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  tagsUrl = `${environment.apiUrl}tags`;

  constructor(
    private http: HttpClient
  ) { }

  getTags(): Observable<[]> {
    return this.http.get<[]>(this.tagsUrl);
  }

  addTag(tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.tagsUrl}`, tag);
  }
}
