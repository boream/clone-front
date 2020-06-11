import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-people-card',
  templateUrl: './search-people-card.component.html',
  styleUrls: ['./search-people-card.component.scss']
})
export class SearchPeopleCardComponent implements OnInit {

  @Input() user: User;

  username: string;
  isDefault: boolean;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.isDefault = this.user.profile.url === '/assets/icons/user.svg';
  }

  visitUser(username: string) {
    this.router.navigate(['/', `@${username}`]);
  }

  addUser(user: User) {

  }
}

