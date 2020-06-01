import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadComponent } from './components/upload/upload.component';
import { UploadRoutingModule } from './upload-routing.module';
import { SmartComponent } from './components/smart/smart.component';



@NgModule({
  declarations: [UploadComponent, SmartComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
  ],
  exports: [
    UploadComponent,
  ]
})
export class UploadModule { }
