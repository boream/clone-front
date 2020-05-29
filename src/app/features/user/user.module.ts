import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { ListImgComponent } from './components/list-img/list-img.component';


@NgModule({
  declarations: [UserComponent, SettingsComponent, HeaderUserComponent, ListImgComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
