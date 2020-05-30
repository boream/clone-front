import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HeaderUserComponent } from './components/header-user/header-user.component';
import { ListImgComponent } from './components/list-img/list-img.component';
import { EditComponent } from './components/edit/edit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CloseAccountComponent } from './components/close-account/close-account.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent, SettingsComponent, HeaderUserComponent, ListImgComponent, EditComponent, ChangePasswordComponent, CloseAccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserComponent
  ]
})
export class UserModule { }
