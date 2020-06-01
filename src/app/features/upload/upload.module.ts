import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadComponent } from './components/upload/upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { SmartComponent } from './components/smart/smart.component';

import { DragDropDirective } from '../../directives/drag-drop.directive';
import { FormUploadComponent } from './components/form-upload/form-upload.component';


@NgModule({
  declarations: [UploadComponent, SmartComponent, DragDropDirective, FormUploadComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
  ],
  exports: [
    UploadComponent,
    DragDropDirective,
  ]
})
export class UploadModule { }
