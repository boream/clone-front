import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmartImgComponent } from './components/smart-img/smart-img.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { PageImgRoutingModule } from './page-img-routing.module';
import { ImgInfoComponent } from './components/img-info/img-info.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderImgComponent } from './components/header-img/header-img.component';



@NgModule({
  declarations: [
    HeaderImgComponent,
    SmartImgComponent,
    SubHeaderComponent,
    ImgInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageImgRoutingModule
  ],
  exports: [
    SmartImgComponent
  ]
})
export class PageImgModule { }
