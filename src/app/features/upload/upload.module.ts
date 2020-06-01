import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadComponent } from './components/upload/upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { ImagesListComponent } from './components/images-list/images-list.component';
import { FormsModule } from '@angular/forms';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { SmartComponent } from './components/smart/smart.component';

import { DragDropDirective } from '../../directives/drag-drop.directive';
import { FormUploadComponent } from './components/form-upload/form-upload.component';


@NgModule({
  declarations: [UploadComponent, ImagesListComponent, ImageCardComponent, SmartComponent, DragDropDirective, FormUploadComponent,],
  imports: [
    CommonModule,
    UploadRoutingModule,
    FormsModule
  ],
  exports: [
    UploadComponent,
    DragDropDirective,
  ]
})
export class UploadModule { }
