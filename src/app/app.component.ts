import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'clone-front';

  isSearchVisible: boolean = false;
  isMainHeaderVisible: boolean = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe(res => {
        this.toggleMainHeader(res.url);
        if (this.isMainHeaderVisible) {
          this.toggleSearchBar(res.url);
        }
      });
  }

  toggleMainHeader(url: string) {
    this.isMainHeaderVisible = url.startsWith('/login') || url.startsWith('/signup') ? false : true;
  }

  toggleSearchBar(url: string) {
    this.isSearchVisible = !url.startsWith('/home');
  }

}
