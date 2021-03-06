import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { WebStorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NgZone } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../components/login/login.component';
import { Location } from "@angular/common";
import { Register } from '../types/register';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let storage: WebStorageService;
  let location: Location;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzNiOWY1Mjc5ODhmMmExYjcyMzg4MCIsImlhdCI6MTU4OTg4NzYwMiwiZXhwIjoxNTkyNDc5NjAyfQ._mEzRzeLZbWIWbX3s8OVnM0yxXCypaHgCki7S-iu6qo';
  const mockRespone = {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzNiOWY1Mjc5ODhmMmExYjcyMzg4MCIsImlhdCI6MTU4OTg4NzYwMiwiZXhwIjoxNTkyNDc5NjAyfQ._mEzRzeLZbWIWbX3s8OVnM0yxXCypaHgCki7S-iu6qo",
    "user": {
      "confirmed": false,
      "blocked": false,
      "_id": "5ec3b9f527988f2a1b723880",
      "username": "email",
      "email": "email@hotmail.com",
      "provider": "local",
      "createdAt": "2020-05-19T10:50:29.733Z",
      "updatedAt": "2020-05-19T10:51:42.596Z",
      "__v": 0,
      "role": {
        "_id": "5ec25a8dedaf8215b07a9799",
        "name": "Authenticated",
        "description": "Default role given to authenticated user.",
        "type": "authenticated",
        "createdAt": "2020-05-18T09:51:09.088Z",
        "updatedAt": "2020-05-18T09:51:09.088Z",
        "__v": 0,
        "id": "5ec25a8dedaf8215b07a9799"
      },
      "id": "5ec3b9f527988f2a1b723880"
    }
  }

  let ngZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WebStorageService, useExisting: LOCAL_STORAGE },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    // https://stackoverflow.com/questions/51455545/when-to-use-ngzone-run
    // https://stackoverflow.com/questions/47503064/running-jasmine-tests-for-a-component-with-ngzone-dependency
    ngZone = TestBed.get(NgZone);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(WebStorageService);
    location = TestBed.get(Location);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should perform a post to /auth/local with email and password from a FormGroup', () => {

    const loginForm = {
      value: {
        identifier: 'email@hotmail.com',
        password: 'email1234',
      }
    } as FormGroup;

    ngZone.run(() => {
      authService.login(loginForm).subscribe(
        (res: any) => {
          expect(res.jwt).toEqual(token, 'expected token');
          expect(storage.get('token')).toEqual(token);
        },
        fail
      );

      const req = httpTestingController.expectOne(`${environment.apiUrl}auth/local`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockRespone);
    });
  });

  it('should perform a post to /auth/local/register with username, email and password from a FormGroup', fakeAsync(() => {

    const user: Register = {
      username: 'email1',
      email: 'email1@hotmail.com',
      password: 'email1234',
      firstname: 'toto',
      lastname: 'capullin'
    }

    ngZone.run(() => {
      authService.signup(user);
  
      const req = httpTestingController.expectOne(`${environment.apiUrl}auth/local/register`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockRespone);
      tick();
      expect(location.path()).toBe('/login?signupSuccess=true');
    });
  }));

  it('should remove token from local storage', fakeAsync(() => {
    storage.set('token', token);
    ngZone.run(() => {
      authService.logout();
      expect(storage.get('token')).toEqual(undefined);
      tick();
      expect(location.path()).toBe('/login');
    });
  }))

});


