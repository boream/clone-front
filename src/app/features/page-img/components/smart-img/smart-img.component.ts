import { Component, OnInit } from '@angular/core';
import { ImageListService } from 'src/app/services/image-list.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

    this.route.params.subscribe(res => {
      this.imageListService.params$.next(res);
    })
  }

  go(event) {
    this.imageListService.direction$.next(event);
  }

}
