import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/types/image';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public featuredImgs: Image[];
  public user: User;

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const username = this.activedRouter.snapshot.params.username;
    this.userService.getUserByUsername(username).subscribe((user: User) => {
      if(user) {
        this.featuredImgs = user.images;
        this.user = user;
      }
    });
  }


}
