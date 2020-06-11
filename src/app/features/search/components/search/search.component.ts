import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  totalResults: number;
  currentChild: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(params => this.query = params.query),
      switchMap(params => this.searchService.search(params.query)),
      switchMap(() => this.route.firstChild?.url),
      map(res => res[0].path),
    ).subscribe(res => {
      this.currentChild = res;
      this.getTotalResults(res);
    });
  }

  private getTotalResults(currentChild: string) {
    switch (currentChild) {
      case 'images':
        this.totalResults = this.searchService.totalImages;
        break;
      case 'people':
        this.totalResults = this.searchService.totalPeople;
        break;
      case 'tags':
        this.totalResults = this.searchService.totalTags;
        break;
    }
  }

}
