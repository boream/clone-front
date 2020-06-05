import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Register } from '../types/register';
import { ToasterService } from '../features/notifications/services/toaster.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${environment.apiUrl}auth`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(
    @Inject(LOCAL_STORAGE)
    private storage: StorageService,
    private router: Router,
    private http: HttpClient,
    private toaster: ToasterService
  ) { }

  login(form: FormGroup): Observable<any> {
    return this.http.post<any>(`${this.url}/local`, form.value, this.httpOptions).pipe(
      tap(response => {this.storage.set('token', response.jwt)
    }));
  }

  signup(user: Register): void {
    this.http.post<any>(`${this.url}/local/register`, user, this.httpOptions).pipe(
      tap(() => this.router.navigateByUrl('/login?signupSuccess=true'))
    ).subscribe(
      () => this.toaster.success('The user was succesfully registered.'/*, {
        autoClose: true,
        keepAfterRouteChange: true
      }*/),
      (error) => this.toaster.error(
        error.error.message[0].messages[0].message,
        { fade: true }
      )
    )
  }

  logout(): void {
    this.storage.remove('token');
    this.router.navigate(['/login']);
  }

}
