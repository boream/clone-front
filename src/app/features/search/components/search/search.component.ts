import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query$: Observable<string>;
  currentChild$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.query$ = this.route.params.pipe(map(params => params['query']));
    this.currentChild$ = this.route.firstChild?.url.pipe(map(res => res[0].path));

    this.route.params.subscribe(params => {
      this.searchService.search(params.query);
    });
  }

}
