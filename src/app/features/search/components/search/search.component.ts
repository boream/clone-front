import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap, switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query: string;
  query$: Observable<string>;
  totalResults: number;
  totalResults$: Observable<number>;
  currentChild: string;
  currentChild$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.searchService.search(params.query))
    ).subscribe();

    this.query$ = this.route.params.pipe(
      map(params => params.query),
      shareReplay(1)
    );

    this.totalResults$ = this.searchService.totalResults$;

    this.currentChild$ = this.route.firstChild?.url.pipe(
      map(res => res[0].path),
      tap(currentChild => this.searchService.childPage$.next(currentChild))
    )
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
