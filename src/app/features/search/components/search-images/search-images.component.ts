import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/types/image';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-search-images',
  templateUrl: './search-images.component.html',
  styleUrls: ['./search-images.component.scss']
})
export class SearchImagesComponent implements OnInit {

  images$: Observable<Image[]>;

  constructor(
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.images$ = this.imageService.getUserPublishedImagesByUsername('claudiabdm');
  }

}
