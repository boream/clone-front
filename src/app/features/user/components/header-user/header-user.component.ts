import { Component, OnInit, Inject } from '@angular/core';
import { StorageService,LOCAL_STORAGE } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';



@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  showControls:boolean = false;
  optionsActived:boolean = false;

  user:Observable<any>;
  userProfile = 'http://localhost:1337/users/me'

  constructor(  @Inject(LOCAL_STORAGE)
              private storage: StorageService,
              private http: HttpClient,
              private router: Router,
              private activedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:1337/users/me').subscribe((res) => {
      this.user = res;
      if(this.user.username == this.activedRouter.params.value.username) {
        this.showControls = true;
      }
    });
  }




  showOptions(event) {
    this.optionsActived = !this.optionsActived;
  }


}
