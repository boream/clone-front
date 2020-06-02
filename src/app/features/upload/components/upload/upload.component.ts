import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  error: boolean = true;
  success: boolean = true;

  user: User
  image: any;


  constructor(private userService: UserService,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser().subscribe((res) => {
      debugger
      this.user = res;
    });
    // this.imageService.saveImage().subscribe((res) => {

    // })

  }

  errorClose() {
    this.error = null;
  }

  successClose() {
    this.success = false;
  }

  imageFileSubmit(imagefile):void {
    debugger
    this.image = imagefile;
    console.log(this.image);
  }

}
