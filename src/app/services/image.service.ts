import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../types/image';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagesUrl = `${environment.apiUrl}images`;

  savedImages$ = new BehaviorSubject<Image[]>([]);

  constructor(private http: HttpClient) { }

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
    data.user = image.user.id;
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
      .pipe(
        map((images: Image[]) => images.map(image => this.formatUrl(image)))
      )
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
