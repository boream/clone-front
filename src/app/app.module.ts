import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UploadComponent } from './components/upload/upload.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { PageUserComponent } from './components/page-user/page-user.component';
import { UserModule } from './features/user/user.module';
<<<<<<< HEAD
import { HeaderComponent } from './components/header/header.component';
=======
import { AuthInterceptor } from './interceptors/auth.interceptor';
>>>>>>> febda454817d987b3842c4ea08bee44ecfe1c670

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    UploadComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent,
    PageUserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
