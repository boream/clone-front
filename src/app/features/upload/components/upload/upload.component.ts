import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { tap, switchMap, map, concatMap, take } from 'rxjs/operators';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { ToasterService } from 'src/app/features/notifications/services/toaster.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  user: User
  image: Image;
  imageFiles: Array<Image> = []

  images$: Observable<Image[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private toasters: ToasterService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.images$ = this.getImages();
  }

  imageFileSubmit(imagefile): void {
    this.image = {
      file: imagefile,
      user: this.user,
      published: false
    };
    this.subscriptions.push(
      this.imageService.saveImage(this.image).subscribe((res) => this.images$ = this.getImages())
    );
  }

  publishedImages() {
    // this.images$ = this.images$
    //   .pipe(
    //     switchMap(images => forkJoin(images.map(image => {
    //       image['name'] && image.category ? image.published = true : image.published = false;
    //       return this.imageService.updateImage(image);
    //     }))),
    //     map(images => {
    //       images.map(image => {
    //         this.checkImageFields(image);
    //         this.imageService.formatUrl(image);
    //       })
    //       return images.filter(image => image.published === false);
    //     }),
    //     tap((res) => {debugger})
    //   )
    this.images$.forEach(element => {
      element.forEach(image => {
        if (image['name'] && image.category) {
          image.published = true;
        }
        this.subscriptions.push(
          this.imageService.updateImage(image).subscribe(() => this.images$ = this.getImages()
            .pipe(
              map(images => images.map(image => (this.checkImageFields(image))))
            )
          )
        )
      })
    })
  }

  cancelImages() {
    this.images$.forEach(element => {
      element.forEach(image => {
        this.subscriptions.push(
          this.imageService.deleteImage(image).subscribe((res) => this.images$ = this.getImages())
        )
      });
    })
  }

  private getImages() {
    return this.userService.getLoggedUser().pipe(
      tap(res => { this.user = res }),
      switchMap(user => {
        return this.imageService.getUserUnpublishedImagesByUsername(user.username);
      })
    );
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
