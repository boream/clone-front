import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { User } from '../types/user';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUser(): Observable<User> {
    return this.http.get<User>('http://localhost:1337/users/me');
  }

  getUserAvatar(): Observable<User> {
    return this.http.get<User>('http://localhost:1337/users/me')
      .pipe(
        map( res => res)
      );
  }

}
