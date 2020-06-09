import { Injectable } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject, of } from 'rxjs';
import { ImageService } from './image.service';
import { withLatestFrom, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImageListService {

  // entrada del componente al servicio
  direction$ = new BehaviorSubject<Number>(0);
  currentImage$ = new BehaviorSubject<String>('');

  // salida del servicio al componente
  image$: Observable<any>;

  constructor(private imageService: ImageService, private router: Router) {
    this.image$ = combineLatest(
      this.imageService.savedImages$,
      this.currentImage$
    ).pipe(
      switchMap(([images, currentImage]) => {
        const image = images.find(img => img.id === currentImage);
        if (image) {
          return of(image);
        }
        if (currentImage) {
          return this.imageService.getImageById(currentImage);
        }
        return of(null);
      })
    );

    this.direction$.pipe(
      withLatestFrom(combineLatest(
        this.imageService.savedImages$,
        this.currentImage$,
      ))
    ).subscribe(([direction, [images, currentImage]]) => {
      let imageIndex = -1;
      if (currentImage) {
        imageIndex = images.findIndex(img => img.id === currentImage)
        if (imageIndex > -1) {
          imageIndex = imageIndex + +direction;
          if (imageIndex < 0) {
            imageIndex = images.length - 1;
          } else if (imageIndex >= images.length) {
            imageIndex = 0;
          }
          this.router.navigate(['/image', images[imageIndex].id]);
        }
      }
    });

  }

}
