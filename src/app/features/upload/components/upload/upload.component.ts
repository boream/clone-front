import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/types/user';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  error: boolean = true;
  success: boolean = true;

  user: User
  image: Image;
  imageFiles: Array<Image> = []


  constructor(private userService: UserService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((res) => {
      debugger
      this.user = res;
    });
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
    this.imageService.saveImage(this.image).subscribe((res) => {
      this.imageFiles.push(res)
      console.log(this.imageFiles);
    })
  }
}
