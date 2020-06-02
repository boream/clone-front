import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';

describe('LoginComponent', () => {
  let loginResponse = {
    jwt: 'token'
  }
  let loginSpy;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authService = jasmine.createSpyObj('AuthService', ['login']);
  loginSpy = authService.login.and.returnValue( of(loginResponse) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'home',
          component: HomeComponent
        }]),
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should has submit method', () => {
    expect(component['submit']).toBeTruthy();
  });

  it('should call login when submit', fakeAsync(() => {
    const form = {
      value: {
        identifier: 'hola@hola.com',
        password: 'asdf'
      },
      valid: false
    }
    // https://stackoverflow.com/questions/51455545/when-to-use-ngzone-run
    fixture.ngZone.run(() => {
      component.submit(form);
    });
    tick();
    expect(loginSpy.calls.any()).toBe(true, 'login called');
  }));
});
