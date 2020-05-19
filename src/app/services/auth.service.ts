import { Injectable, Inject } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(LOCAL_STORAGE)
    private storage: StorageService,
    private router: Router
  ) { }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
