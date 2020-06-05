import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartImgComponent } from './components/smart-img/smart-img.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { PageImgRoutingModule } from './page-img-routing.module';
import { ImgInfoComponent } from './img-info/img-info.component';



@NgModule({
  declarations: [
    SmartImgComponent,
    SubHeaderComponent,
    ImgInfoComponent
  ],
  imports: [
    CommonModule,
    PageImgRoutingModule
  ],
  exports: [
    SmartImgComponent
  ]
})
export class PageImgModule { }
