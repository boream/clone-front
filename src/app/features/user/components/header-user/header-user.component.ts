import { Component, OnInit, Inject, Input } from '@angular/core';
import { StorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../types/user';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  @Input() user: User;

  showControls: boolean = false;
  optionsActived: boolean = false;

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const username = this.activedRouter.snapshot.params.username;
    this.userService.getLoggedUser().subscribe((user: User) => {
      if (username === `@${user.username}`) {
        this.showControls = true;
      }
    });
  }

  showOptions() {
    this.optionsActived = !this.optionsActived;
  }

  logOut(){
    this.authService.logout();
  }


}
