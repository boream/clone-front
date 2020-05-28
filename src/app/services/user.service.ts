import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, forkJoin } from 'rxjs';
import { User } from '../types/user';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { switchMap, tap, scan } from 'rxjs/operators';
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

  getLoggedUserImages(): Observable<User['images']> {
    return this.getLoggedUser()
      .pipe(
        map((user: User) => user.images.map(img => `id_in=${img}`)),
        switchMap((images: string[]) => {
          const query = images.join('&');
          return this.getImage(query);
        }),
      )
  }

  getLoggedUserAvatar(): Observable<string> {
    return this.getLoggedUser()
      .pipe(
        map(res => `${environment.apiUrl}${res['profile'].url}`)
      );
  }

  getImage(query: string): Observable<any> {
    return this.http.get(`${this.imagesUrl}?${query}`);
  }

  updateUser(userId: string, user: User) {
    return this.http.put<User>(`${this.userUrl}/${userId}`, user);
  }

  changePassword(password: string) {
    return this.getLoggedUser()
      .pipe(
        switchMap((user: User) => {
          user['password'] = password;
          return this.updateUser(user.id, user);
        })
      )
  }

  closeAccount() {
    this.getLoggedUser().pipe(
      switchMap((user: User) => {
        return this.http.delete(`${this.userUrl}/${user.id}`)
      }),
      tap(() => this.router.navigate(['/login']))
    )
  }

  getUserByUsername(username: string) {
    return this.http.get(`${this.userUrl}/?username=${username}`)
      .pipe(
        map(res => res[0])
      )
  }

  getUserImages(username: string): Observable<User['images']> {
    return this.getUserByUsername(username)
      .pipe(
        map((user: User) => {debugger; return user.images.map(img => `id_in=${img}`)}),
        switchMap((images: string[]) => {
          debugger
          const query = images.join('&');
          return this.getImage(query);
        }),
      )
  }

}
