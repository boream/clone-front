import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';
import { tap, switchMap, map } from 'rxjs/operators';
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

  constructor(private userService: UserService,
              private imageService: ImageService) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.userService.getLoggedUser().subscribe((res) => {
        this.user = res;
      })
    );
    this.images$ = this.getImages();
  }

  errorClose() {
    this.error = null;
  }

  successClose() {
    this.success = false;
  }

  imageFileSubmit(imagefile):void {
    this.image = {
      file: imagefile,
      user: this.user,
      published: false
    };
    console.log(this.image);
    this.subscriptions.push(
      this.imageService.saveImage(this.image).subscribe((res) => {
        this.images$ = this.getImages();
      })
    );
  }

  private getImages() {
    return this.userService.getLoggedUser().pipe(
      tap(res => { this.user = res }),
      switchMap(user => {
        return this.imageService.getUserImagesByUsername(user.username).pipe(
          map(images => {
            return images.filter(img => !img.published || img.published === false)
          })
        )
      })
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
        this.imageService.updateImage(image).subscribe((res) => {console.log(res);
          this.images$ = this.getImages();
        })
      })
    });
  }

  cancelImages() {
    this.images$.forEach(element => {
      element.forEach(image => {
        this.imageService.deleteImage(image).subscribe((res) => {console.log(res);
          this.images$ = this.getImages();
        })
      })
    });
  }
}
