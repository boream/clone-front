import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Image } from '../types/image';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  imagesUrl = `${environment.apiUrl}images`

  constructor(private http: HttpClient) { }

  saveImage(image: Image): Observable<any> {
    const data: any = {};
    data.name = image.title;
    if (image.category) {
      data.category = image.category;
    }
    if (image.tags) {
      data.tags = image.tags;
    }
    const formData = new FormData();
    formData.append('files.file', image.file, image.file.name);
    formData.append('data', JSON.stringify(data))
    return this.http.post(this.imagesUrl, formData);
  }
}
