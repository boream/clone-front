import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/types/image';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/types/user';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public featuredImgs: Image[];
  public user: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((res) => res['params']),
      switchMap(params => this.userService.getUserByUsername(params['username'])
      )
    ).subscribe((user: User) => {
      this.featuredImgs = user.images;
      this.user = user;
    }
    );
  }


}
