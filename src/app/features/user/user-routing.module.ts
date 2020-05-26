import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {path: '/@:username', component: UserComponent},
  {path: '/settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
