import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadComponent } from './components/upload/upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { ImagesListComponent } from './components/images-list/images-list.component';
import { FormsModule } from '@angular/forms';
import { ImageCardComponent } from './components/image-card/image-card.component';



@NgModule({
  declarations: [UploadComponent, ImagesListComponent, ImageCardComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    FormsModule
  ],
  exports: [
    UploadComponent,
  ]
})
export class UploadModule { }
