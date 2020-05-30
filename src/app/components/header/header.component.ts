import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @Input() isSearchVisible: boolean = false;
  isNavVisible: boolean = false;
  isMenuOpen: boolean = false;

  userAvatar: Observable<string>;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // this.userAvatar = this.http.get('http://localhost:1337/users/me').pipe(map(res => { debugger; return res['profile'].url }))
  }

  toggleNotifications() {

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
