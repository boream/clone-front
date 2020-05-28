import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Input() isSearchVisible: boolean = false;
  isNavVisible: boolean = false;
  isMenuOpen: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEmpty: boolean = true;
  userAvatar: Observable<string>;
  username: Observable<string>;
  notifications: [] = [];
  categories: string[] = ['Example'];
  defaultImg: string = '/assets/icons/user.svg';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userAvatar = this.http.get('http://localhost:1337/users/me')
      .pipe(
        map(res => res['profile'] ? `http://localhost:1337${res['profile'].url}` : this.defaultImg)
      );
    this.username = this.http.get('http://localhost:1337/users/me')
      .pipe(
        map(res => res['username'])
      );
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
