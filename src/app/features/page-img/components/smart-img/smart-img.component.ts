import { Component, OnInit } from '@angular/core';
import { ImageListService } from 'src/app/services/image-list.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { has } from 'lodash';

@Component({
  selector: 'app-smart-img',
  templateUrl: './smart-img.component.html',
  styleUrls: ['./smart-img.component.scss']
})
export class SmartImgComponent implements OnInit {

  image$: Observable<any>

  constructor(private imageListService: ImageListService,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.image$ = this.imageListService.image$;

    this.route.params.subscribe(params => {
      if (has(params, 'id')) {
        this.imageListService.currentImage$.next(params.id);
      }
    })
  }

  go(event) {
    this.imageListService.direction$.next(event);
  }

}
