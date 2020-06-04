import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../types/image';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagesUrl = `${environment.apiUrl}images`

  constructor(private http: HttpClient) { }

  saveImage(image: Image): Observable<any> {
    debugger
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
    debugger
    const updateImage = {
      name: image.file.name,
      published: image.published,
      tags: image.tags,
      category: image.category,
      user: image.user,
    }
    return this.http.put<Image>(`${this.imagesUrl}/${image.id}`, updateImage);
  }

  updateImageFile(image: Image): Observable<any> {
    debugger
    const formData = new FormData();
    formData.append('files', image.file, image.file.name);
    formData.append('ref', 'image');
    formData.append('refId', image.id);
    formData.append('field', 'file');
    return this.http.post(`${environment.apiUrl}upload`, formData);
  }

  getUserImagesByUsername(username: string): Observable<Image[]> {
    return this.http.get(this.imagesUrl)
      .pipe(
        map((images: Image[]) => images.filter((img: Image) => {
          if (img.user && img.user.username === username) {
            img.url = `${environment.apiUrl}${img.file['url'].slice(1)}`;
            return img;
          }
        }))
      )
  }
}
