import { TestBed } from '@angular/core/testing';
import { WebStorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzNiOWY1Mjc5ODhmMmExYjcyMzg4MCIsImlhdCI6MTU4OTg4NzYwMiwiZXhwIjoxNTkyNDc5NjAyfQ._mEzRzeLZbWIWbX3s8OVnM0yxXCypaHgCki7S-iu6qo';
  const loginForm = {
    value: {
      identifier: 'email@hotmail.com',
      password: 'email1234',
    }
  } as FormGroup;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WebStorageService, useExisting: LOCAL_STORAGE },
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
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

    authService.login(loginForm).subscribe(
      (res: any) => { expect(res.jwt).toEqual(token, 'expected token') },
      fail
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}auth/local`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockRespone);

  });

  it('should perform a post to /auth/local/register with username, email and password from a FormGroup', () => {

    const signupForm = {
      value: {
        username: 'email1',
        email: 'email1@hotmail.com',
        password: 'email1234',
      }
    } as FormGroup;

    authService.signup(signupForm).subscribe(
      (res: any) => { expect(res.jwt).toEqual(token, 'expected token') },
      fail
    );

    const req = httpTestingController.expectOne(`${environment.apiUrl}auth/local/register`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockRespone);

  });

});


