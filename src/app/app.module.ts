import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { UserModule } from './features/user/user.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UploadModule } from './features/upload/upload.module';
import { HeadersubComponent } from './components/headersub/headersub.component';
import { NotificationsModule } from './features/notifications/notifications.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    PageNotFoundComponent,
    LoginComponent,
    HeaderComponent,
    HeadersubComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UserModule,
    UploadModule,
    NotificationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
