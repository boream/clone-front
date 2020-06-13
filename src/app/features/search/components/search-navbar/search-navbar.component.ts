import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-navbar',
  templateUrl: './search-navbar.component.html',
  styleUrls: ['./search-navbar.component.scss']
})
export class SearchNavbarComponent implements OnInit {

  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  changeChild(name: string) {
    this.searchService.childPage$.next(name);
  }
}
