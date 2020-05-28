import { Component, OnInit, Inject } from '@angular/core';
import { StorageService,LOCAL_STORAGE } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../types/user';



@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  showControls:boolean = false;
  optionsActived:boolean = false;

  user: User;
  userProfile = 'http://localhost:1337/users/me'

  constructor(  @Inject(LOCAL_STORAGE)
              private storage: StorageService,
              private http: HttpClient,
              private router: Router,
              private activedRouter: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((res: User) => {
      this.user = res;
      console.log(this.user);
      if(`@${this.activedRouter.snapshot.params.username}` === `@${this.user.username}`) {
        this.showControls = true;
      }
    });
  }




  showOptions(event) {
    this.optionsActived = !this.optionsActived;
  }


}
