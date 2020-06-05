import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { ImageService } from './image.service';
import { Image } from '../types/image';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  // entrada del componente al servicio
  direction$ = new BehaviorSubject<Number>(0);
  params$ = new BehaviorSubject<Params>(null);

  // salida del servicio al componente
  image$: Observable<any>;

  miRuta: Observable<any>;


  constructor(private imageService: ImageService, private route: ActivatedRoute) { 

    this.image$ = combineLatest(
      this.imageService.savedImages$,
      this.params$,
      this.direction$
    ).pipe(
      map(([images, params, direction]) => {
        debugger
        let imageIndex = -1;
        if (Array.isArray(images) && params && params.id) {
          imageIndex = images.findIndex(img => img.id === params.id)
          if (imageIndex > 0 && imageIndex < images.length - 1) {
            return images[imageIndex + +direction];
          } else if (imageIndex === 0) {
            return images[images.length - 1];
          } else if (imageIndex === images.length - 1) {
            return images[0]
          }
        }
        return null;
      })
    )
  }



}
