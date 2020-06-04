import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Image } from 'src/app/types/image';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/types/user';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { map } from 'rxjs/internal/operators/map';
import { forkJoin } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';


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
    private userService: UserService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((res) => res['params']),
      switchMap(params => {
        return forkJoin(
          this.userService.getUserByUsername(params['username']),
          this.imageService.getUserPublishedImagesByUsername(params['username'].slice(1)))
      })
    )
    .subscribe(res => {
      [this.user, this.featuredImgs] = res;
    })
  }


}
