import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { Image } from '../types/image';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageService } from './image.service';
import { map, switchMap } from 'rxjs/operators';
import { clone } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  imagesUrl = `${environment.apiUrl}images?published=true`;

  images$: Observable<Image[]>;
  people$: Observable<any[]>;
  tags$: Observable<any[]>;

  search$ = new BehaviorSubject<Image[]>([]);

  constructor(private http: HttpClient, private imageService: ImageService) {

    this.images$ = this.search$;

    this.people$ = this.search$.pipe(
      switchMap(images => {
        const users = images.map(img => img.user.id)
        const uniq = [... new Set(users)];
        const request = uniq.map(id => this.getThreeUserImages(id));
        return forkJoin(request).pipe(
          map(imagesResponse => {
            const users = imagesResponse.map(img => img[0].user);
            users.forEach((user, index) => {
              const selectedImages = clone(imagesResponse[index]);
              selectedImages.forEach(img => {
                delete img.user;
              });
              user.images = selectedImages;
              return user;
            });
            return users;
          })
        )
      })
    );

    this.tags$ = this.search$.pipe(
      switchMap(images => {
        const tags = images.reduce((acc, img) => {
          const imgTags = img.tags.map(tag => tag.id);
          return acc.concat(imgTags);
        }, []);
        const uniq = [... new Set(tags)];
        const request = uniq.map(id => this.getThreeTagImages(id));
        return forkJoin(request)
      })
    );

  }

  search(categoryName) {
    this.getImagesByCategoryName(categoryName).subscribe(res => this.search$.next(res));
  }

  getThreeUserImages(userId) {
    return this.http.get<Image[]>(`${this.imagesUrl}&user.id=${userId}&_limit=3`).pipe(
      map((images: Image[]) => images.map(image => this.imageService.formatUrl(image)))
    );
  }

  getThreeTagImages(tagId) {
    return this.http.get<Image[]>(`${this.imagesUrl}&tags.id=${tagId}&_limit=3`).pipe(
      map((images: Image[]) => images.map(image => this.imageService.formatUrl(image)))
    );
  }

  getImagesByCategoryName(categoryName) {
    return this.http.get<Image[]>(`${this.imagesUrl}&category.title=${categoryName}`).pipe(
      map((images: Image[]) => images.map(image => this.imageService.formatUrl(image)))
    )
  }

  getImagesByCategoryId(categoryId) {
    return this.http.get<Image[]>(`${this.imagesUrl}&category.id=${categoryId}`).pipe(
      map((images: Image[]) => images.map(image => this.imageService.formatUrl(image)))
    )
  }

  getImagesByTagsId(tagId) {
    return this.http.get<Image[]>(`${this.imagesUrl}&tags.id=${tagId}`).pipe(
      map((images: Image[]) => images.map(image => this.imageService.formatUrl(image)))
    )
  }

  getImagesByTagsName(tagName) {
    return this.http.get<Image[]>(`${this.imagesUrl}&tags.name=${tagName}`).pipe(
      map((images: Image[]) => images.map(image => this.imageService.formatUrl(image)))
    )
  }
}
