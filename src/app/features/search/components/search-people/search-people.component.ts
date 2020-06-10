import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  users$: Observable<User[]>;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.users$ = combineLatest(this.userService.getUserByUsername('@claudiabdm'), this.userService.getUserByUsername('@test'));
  }

}
