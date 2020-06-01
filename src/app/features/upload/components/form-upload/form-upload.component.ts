import { Component, OnInit, Output } from '@angular/core';
import { FileHandle } from 'src/app/directives/drag-drop.directive';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {

  @Output() imageFile;

  image: File;
  imageSelected: string | ArrayBuffer;

  files: ArrayBuffer[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  changeFile(event) {
    debugger
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSelected = reader.result;
      this.imageFile = this.image
      console.log(this.imageFile);
    }
  }



  filesDropped(files): void {
    debugger
    this.files = files;
    this.imageFile = this.files;
    console.log(this.imageFile);

  }

}
