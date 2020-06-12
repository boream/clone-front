import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin, combineLatest } from 'rxjs';
import { Image } from '../types/image';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ImageService } from './image.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { clone } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  imagesUrl = `${environment.apiUrl}images?published=true`;

  images$ = new BehaviorSubject<any[]>([]);
  totalResults$: Observable<number>;
  people$ = new BehaviorSubject<any[]>([]);
  tags$: Observable<any[]>;

  search$ = new BehaviorSubject<Image[]>([]);

  childPage$ = new BehaviorSubject<string>('');

  totalPeople: number = 0;
  totalImages: number = 0;
  totalTags: number = 0;

  constructor(private http: HttpClient, private imageService: ImageService) {

    this.search$.subscribe(res => this.images$.next(res))

    this.search$.pipe(
      switchMap(images => {
        const users = images.map(img => {
          if (img.user) {
            return img.user.id;
          }
          return null;
        }).filter(id => id != null);
        const uniq = [... new Set(users)];
        this.totalPeople = uniq.length;
        const request = uniq.map(id => this.getThreeUserImages(id));
        return forkJoin(request).pipe(
          map(imagesResponse => {
            const users = imagesResponse.map(img => img[0].user);
            users.forEach((user, index) => {
              const selectedImages = clone(imagesResponse[index]);
              selectedImages.forEach(img => {
                delete img.user;
              });
              if (!user.profile) {
                user.profile = { url: '/assets/icons/user.svg' };
              } else {
                user.profile.url = `${environment.apiUrl}${user.profile.url.slice(1)}`;
              }
              user.images = selectedImages;
              return user;
            });
            return users;
          })
        )
      })
    ).subscribe(res => this.people$.next(res))


    this.totalResults$ = combineLatest(
      this.childPage$,
      this.images$,
      this.people$
    ).pipe(
      map(([childPage, images, people]) => {
        switch (childPage) {
          case 'images':
            return images.length;
          case 'people':
            return people.length;
          default:
            return 0;
        }
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
    return this.getImagesByCategoryName(categoryName)
      .pipe(
        tap(res => this.search$.next(res))
      );
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
