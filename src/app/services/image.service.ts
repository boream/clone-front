import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../types/image';
import { Observable, BehaviorSubject, of, Subject, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap, repeatWhen, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../types/user';
import { ToasterService } from '../features/notifications/services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagesUrl = `${environment.apiUrl}images`;

  unpublishedImages$: Observable<Image[]>;
  refreshUnpublished$ = new Subject();

  publishedImages$ = new BehaviorSubject<Image[]>([]);
  savedImages$ = new BehaviorSubject<Image[]>([]);

  user: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toaster: ToasterService) {

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

    this.unpublishedImages$ = this.authService.user$.pipe(
      switchMap(user => {
        return this.getUserUnpublishedImagesByUsername(user.username).pipe(
          repeatWhen(() => this.refreshUnpublished$)
        )
      })
    );
  }

  publishImages() {
    this.unpublishedImages$.pipe(
      take(1),
      switchMap(images => {
        const toPublish = images.filter(img => img['name'] && img.category).map(img => {
          img.published = true;
          return img;
        });
        if (toPublish.length != images.length) {
          this.toaster.error('Some images cannot be saved.');
        }
        const requests = toPublish.map(img => this.updateImage(img));
        if (requests.length > 0) {
          return forkJoin(requests);
        }
        return of(images);
      })
    ).subscribe(() => this.refreshUnpublished$.next())
  }

  cancelUnpublishedImages() {
    this.unpublishedImages$.pipe(
      take(1),
      switchMap(images => {
        const requests = images.map(img => this.deleteImage(img));
        return forkJoin(requests);
      })
    ).subscribe(() => this.refreshUnpublished$.next());
  }

  getImageById(id: String) {
    return this.http.get<Image>(`${this.imagesUrl}/${id}`).pipe(
      map(img => Object.assign({}, img,
        { url: `${environment.apiUrl}${img.file['url'].slice(1)}` })),
      catchError(() => of(null))
    );
  }

  saveImage(image: Image): Observable<any> {
    const data: any = {};
    data.name = image.title;
    if (image.category) {
      data.category = image.category;
    }
    if (image.tags) {
      data.tags = image.tags;
    }
    data.user = this.user.id;
    data.published = image.published
    const formData = new FormData();
    formData.append('files.file', image.file, image.file.name);
    formData.append('data', JSON.stringify(data));
    return this.http.post(this.imagesUrl, formData);
  }

  updateImage(image: Image) {
    return this.http.put<Image>(`${this.imagesUrl}/${image.id}`, image);
  }

  updateImageFile(image: Image): Observable<any> {
    const formData = new FormData();
    formData.append('files', image.file, image.file.name);
    formData.append('ref', 'image');
    formData.append('refId', image.id);
    formData.append('field', 'file');
    return this.http.post(`${environment.apiUrl}upload`, formData);
  }

  getUserPublishedImagesByUsername(username: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.imagesUrl}?user.username=${username}&published=true`)
      .pipe(
        tap((images: Image[]) => this.savedImages$.next(images)),
        map((images: Image[]) => images.map(image => this.formatUrl(image)))
      )
  }

  getUserPublishedImagesByUsernameLimit(username: string, limit: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.imagesUrl}?user.username=${username}&published=true&_limit=${limit}`)
      .pipe(
        tap((images: Image[]) => this.savedImages$.next(images)),
        map((images: Image[]) => images.map(image => this.formatUrl(image)))
      )
  }

  getUserUnpublishedImagesByUsername(username: string): Observable<Image[]> {
    return this.http.get<Image[]>(`${this.imagesUrl}?user.username=${username}&published=false`)
      .pipe(map((images: Image[]) => images.map(image => this.formatUrl(image))))
  }

  deleteImage(image: Image) {
    return this.http.delete<Image>(`${this.imagesUrl}/${image.id}`);
  }

  formatUrl(image: Image) {
    const img = image;
    img.url = `${environment.apiUrl}${img.file['url'].slice(1)}`;
    return img;
  }

}
