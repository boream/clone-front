import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartImgComponent } from './components/smart-img/smart-img.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';



@NgModule({
  declarations: [SmartImgComponent, SubHeaderComponent],
  imports: [
    CommonModule
  ]
})
export class PageImgModule { }
