import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/settings/settings.component';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
  {
    path: 'settings', 
    component: SettingsComponent/*,
    children: [
      { 
        path: '', 
        component: EditComponent
      },
      { 
        path: 'change-password', 
        component: ChangePasswordComponent
      },
      { 
        path: 'close-account', 
        component: CloseAccountComponent
      },
    ]*/
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
