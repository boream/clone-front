import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SettingsComponent } from './settings/settings.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [UserComponent, SettingsComponent, HeaderComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
