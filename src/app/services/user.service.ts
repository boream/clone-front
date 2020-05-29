import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, forkJoin, of } from 'rxjs';
import { User } from '../types/user';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { switchMap, tap, scan, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Image } from '../types/image';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = `${environment.apiUrl}users`;
  imagesUrl = `${environment.apiUrl}images`;
  defaultImg = '/assets/icons/user.svg';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/me`);
  }

  getLoggedUserImages(): Observable<Image[]> | Observable<any[]> {
    return this.getLoggedUser()
      .pipe(
        map((user: User) => user.images.map(img => `id_in=${img}`)),
        switchMap((images) => {
          if (images.length > 0) {
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
        map((user: User) => user.profile ? `${environment.apiUrl}${user.profile.url.slice(1)}` : this.defaultImg)
      );
  }

  getImage(query: string): Observable<Image[]> {
    return this.http.get<User['images']>(`${this.imagesUrl}?${query}`)
      .pipe(
        map((images: User['images']) => {
          images.map((img: Image) => img.url = `${environment.apiUrl}${img.file['url'].slice(1)}`)
          return images;
        })
      );
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
    return this.http.get(`${this.userUrl}/?username=${username.slice(1)}`)
      .pipe(
        map(res => {
          const user = res[0];
          if(user) {
            if (!user.firstname && !user.lastname) {
              user.firstname = 'Name';
              user.lastname ='Last';
            }
            if (!user.profile) {
              user.profile = { url: this.defaultImg };
            } else {
              user.profile.url = `${environment.apiUrl}${user.profile.url.slice(1)}`;
            }
            user.images.map((img: Image) => img.url = `${environment.apiUrl}${img.file['url'].slice(1)}`);
            return user;
          }
          return null;
        })
      )
  }

}
