import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

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
        RouterTestingModule,
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

  it('should call login when submit', () => {
    const form = {
      value: {
        identifier: 'hola@hola.com',
        password: 'asdf'
      },
      valid: false
    }
    component.submit(form);
    expect(loginSpy.calls.any()).toBe(true, 'login called');
  });
});
