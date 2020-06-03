import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../../types/user';
import { AuthService } from 'src/app/services/auth.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';


@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  @Input() user: User;
  username: User['username'];

  showControls: boolean = false;
  optionsActived: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((res) => res['params']),
        switchMap(params => {
          this.username = params['username'];
          return this.userService.getLoggedUser();
        }),
      )
      .subscribe((user: User) => {
        if (this.username === `@${user.username}`) {
          this.showControls = true;
        }
      })
  }

  showOptions() {
    this.optionsActived = !this.optionsActived;
  }

  logOut() {
    this.authService.logout();
  }
}
