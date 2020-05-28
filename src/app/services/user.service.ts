import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { User } from '../types/user';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = `${environment.apiUrl}users`;
  imagesUrl = `${environment.apiUrl}images`;

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>(this.userUrl);
  }

  getUserImages(): Observable<User['images']> {
    return this.http.get<User>(this.userUrl)
  }

  getUserAvatar(): Observable<string> {
    return this.http.get<User>(this.userUrl)
      .pipe(
        map( res => `${environment.apiUrl}${res['profile'].url}`)
      );
  }

}
