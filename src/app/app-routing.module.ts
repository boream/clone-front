import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadComponent } from './components/upload/upload.component';
import { SearchComponent } from './components/search/search.component';


const routes: Routes = [
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignUpComponent },
  {
    path: 'home',
    component: HomeComponent,
    children:
      [
        { path: 'profile', component: ProfileComponent },
        { path: 'upload', component: UploadComponent },
        { path: 'search', component: SearchComponent },
      ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
