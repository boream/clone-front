import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = `${environment.apiUrl}auth`;

  constructor(
    @Inject(LOCAL_STORAGE)
    private storage: StorageService,
    private router: Router,
    private http: HttpClient
  ) { }

  login(form: FormGroup): Observable<Object> {
    return this.http.post(`${this.url}login`, form);
  }

  logout(): void {
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
