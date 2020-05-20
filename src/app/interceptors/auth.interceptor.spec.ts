import { TestBed, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WebStorageService, LOCAL_STORAGE } from 'ngx-webstorage-service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../components/login/login.component';

describe('AuthInterceptor', () => {
  const privateEndpoint = `${environment.apiUrl}categories`;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;
  let storage: WebStorageService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: WebStorageService, useExisting: LOCAL_STORAGE },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent }
        ]),
        HttpClientTestingModule,
      ],
    })
    httpTestingController = TestBed.inject(HttpTestingController);
    storage = TestBed.inject(WebStorageService);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });


  it('should not have an Authorization header if token not in storage', fakeAsync(() => {
    storage.remove('token');

    http.get(privateEndpoint).subscribe();

    const req = httpTestingController.expectOne(privateEndpoint);
    expect(req.request.headers.has('Authorization')).toEqual(false);
  }))

  it('should have an Authorization header if token in storage', fakeAsync(() => {
    storage.set('token', 'mytoken');

    http.get(privateEndpoint).subscribe();

    const req = httpTestingController.expectOne(privateEndpoint);
    expect(req.request.headers.has('Authorization')).toEqual(true);
  }))

  it('should have an Authorization header equal to Bearer + storage token', fakeAsync(() => {
    storage.set('token', 'mytoken');

    http.get(privateEndpoint).subscribe();

    const req = httpTestingController.expectOne(privateEndpoint);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mytoken');
  }))



});
