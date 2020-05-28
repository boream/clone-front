import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { User } from '../types/user';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { switchMap, tap, scan, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = `${environment.apiUrl}users`;
  imagesUrl = `${environment.apiUrl}images`;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/me`);
  }

  getLoggedUserImages(): Observable<User['images']> | Observable<any[]> {
    return this.getLoggedUser()
      .pipe(
        map((user: User) => user.images.map(img => `id_in=${img}`)),
        switchMap((images) => {
          if(images.length > 0) {
            const query = images.join('&');
            return this.getImage(query);
          }
          return of([]);
        }),
      )
  }

  getLoggedUserAvatar(): Observable<string> {
    return this.getLoggedUser()
      .pipe(
        map(res => `${environment.apiUrl}${res['profile'].url}`)
      );
  }

  getImage(query: string): Observable<User['images']> {
    return this.http.get<User['images']>(`${this.imagesUrl}?${query}`);
  }

  updateUser(user: User) {
    return this.http.put<User>(`${this.userUrl}/${user.id}`, user)
  }

  changePassword(user: User, password: string) {
    user['password'] = password;
    return this.updateUser(user);
  }

  closeAccount(user: User): Observable<Object> {
    return this.http.delete(`${this.userUrl}/${user.id}`)
      .pipe(
        tap(() => this.router.navigate(['/login']))
      )
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get(`${this.userUrl}/?username=${username}`)
      .pipe(
        map(res => res[0])
      )
  }

  getUserImages(username: string): Observable<User['images']> {
    return this.http.get(`${this.userUrl}/?username=${username}`)
      .pipe(
        map((user: User) => user[0].images),
      )
  }

}
