import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public featuredImages: Array<any> = [
    {
      src: 'https://images.unsplash.com/photo-1551237400-b5f87cd309f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1430&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1542182585-d1b80b3807ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1445093446913-34933e71f8ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1511804472014-fa7b871cd6a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1551239996-9d59ea477c70?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1455245737663-3edc3b61dd1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    },
    {
      src: 'https://images.unsplash.com/photo-1529420705456-5c7e04dd043d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=100&q=80',
    }
  ];

  public mockImages = []

  constructor(
    // private route: ActivatedRouteSnapshot,
    // private router: Router
  ) { }

  userName: string = '';

  ngOnInit(): void {
    this.mockImages = this.featuredImages
      .concat(this.featuredImages)
      .concat(this.featuredImages)
      .concat(this.featuredImages)
      .concat(this.featuredImages)
      .concat(this.featuredImages)
      .concat(this.featuredImages)
  }


}
