import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/types/image';
import { ImageService } from 'src/app/services/image.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.scss']
})
export class SearchImagesComponent implements OnInit {

  images$: Observable<Image[]>;

  constructor(
    private imageService: ImageService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    // this.images$ = this.imageService.getUserPublishedImagesByUsername('claudiabdm');

    // this.images$ = this.searchService.getImagesByCategoryId('5ed63b4f3ad5d77fec805e91')

    // this.images$ = this.searchService.getImagesByTagsId('5ee1e534d1429f1e6debd464')

    // this.images$ = this.searchService.getImagesByTagsName('dos')

    this.images$ = this.searchService.images$;
  }

}
