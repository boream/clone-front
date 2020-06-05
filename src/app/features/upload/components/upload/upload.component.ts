import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { tap, switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  error: boolean = true;
  success: boolean = true;

  user: User
  image: Image;
  imageFiles: Array<Image> = []

  images$: Observable<Image[]>;

  subscriptions: Subscription[] = [];

  constructor(
    private userService: UserService,
    private imageService: ImageService
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.images$ = this.getImages();
  }

  errorClose() {
    this.error = null;
  }

  successClose() {
    this.success = false;
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
    this.images$.forEach(element => {
      element.forEach(image => {
        image = {
          id: image.id,
          file: image.file,
          user: this.user,
          published: true
        }
        this.subscriptions.push(
          this.imageService.updateImage(image).subscribe((res) => this.images$ = this.getImages())
        )
      })
    });
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

}
