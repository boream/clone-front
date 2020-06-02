import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';


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
  username: string;
  notifications: [] = [];
  @Input() categories: string[] = ['Example'];


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((user: User) => {
      this.username = `@${user.username}`;
    })
    this.userAvatar = this.userService.getLoggedUserAvatar();
    // this.username = this.userService.getLoggedUser().pipe( map((user: User) => `@${user.username}`));
  }

  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
