import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  user: User
  image: Image;
  imageFiles: Array<Image> = [];

  published = false;

  images$: Observable<Image[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private imageService: ImageService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.images$ = this.imageService.unpublishedImages$.pipe(
      map(images => {
        debugger
        if (this.published) {
          return images.map(this.checkImageFields);
        }
        return images;
      })
    )
  }

  imageFileSubmit(imagefile): void {
    this.image = {
      file: imagefile,
      user: this.user,
      published: false
    };
    this.subscriptions.push(
      this.imageService.saveImage(this.image).subscribe(_ => this.imageService.refreshUnpublished$.next(null))
    );
  }

  publishImages() {
    this.published = true;
    this.imageService.publishImages();
  }

  cancelImages() {
    this.imageService.cancelUnpublishedImages();
  }

  private checkImageFields(image: Image) {
    const imageChecked = image;
    imageChecked['error'] = { title: false, category: false };
    if (!imageChecked['name']) {
      imageChecked['error'].title = true;
    }
    if (!imageChecked.category) {
      imageChecked['error'].category = true;
    }
    return imageChecked;
  }

}
