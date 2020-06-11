import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import {Location} from '@angular/common';



@Component({
  selector: 'app-header-img',
  templateUrl: './header-img.component.html',
  styleUrls: ['./header-img.component.scss']
})
export class HeaderImgComponent implements OnInit {

  // @Input() isSearchVisible: boolean = false;
  isNavVisible: boolean = false;
  isMenuOpen: boolean = false;
  isNotificationOpen: boolean = false;
  notificationsEmpty: boolean = true;
  userAvatar$: Observable<string>;
  username: string;
  notifications: [] = [];
  //@Input() categories: string[] = ['Example'];


  constructor(
    private userService: UserService,
    private _location: Location) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((user: User) => {
      this.username = `@${user.username}`;
    })
    this.userAvatar$ = this.userService.getLoggedUserAvatar();
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  back() {
    this._location.back();
  }

}
