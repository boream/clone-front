import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from './components/toaster/toaster.component';
import { ToasterService } from './services/toaster.service';
// import { ToasterService } from './services/toaster.service';



@NgModule({
  declarations: [ToasterComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ToasterComponent
  ],
  entryComponents: [
    ToasterComponent
  ]
})
export class NotificationsModule {
  constructor(toasterService: ToasterService) {
    toasterService.injectComponent(ToasterComponent);
  }
}
