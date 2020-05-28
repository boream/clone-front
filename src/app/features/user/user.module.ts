import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';
import { EditComponent } from './components/edit/edit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CloseAccountComponent } from './components/close-account/close-account.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserComponent, SettingsComponent, EditComponent, ChangePasswordComponent, CloseAccountComponent],
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
