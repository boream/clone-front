import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  user$: Observable<User>;
  userImages$: Observable<Image[]>;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUserByUsername('@claudiabdm');
    this.userImages$ = this.imageService.getUserPublishedImagesByUsernameLimit('claudiabdm', 3);
  }

}
