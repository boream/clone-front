import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-people-card',
  templateUrl: './search-people-card.component.html',
  styleUrls: ['./search-people-card.component.scss']
})
export class SearchPeopleCardComponent implements OnInit {

  @Input() user: User;
  @Input() userImages: Image[];

  username: string;
  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  visitUser(username: string) {
    this.router.navigate(['/', `@${username}`]);
  }

  addUser(user: User) {

  }
}
