import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Register } from 'src/app/types/register';
import { AuthService } from 'src/app/services/auth.service';

describe('SignupComponent', () => {
  let signUpResponse = {
    jwt: 'token'
  }
  let signUpSpy;
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const authService = jasmine.createSpyObj('AuthService', ['signup']);
  signUpSpy = authService.signup.and.returnValue( of(signUpResponse) );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: AuthService, useValue: authService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service on submit', () => {
    const user: Register = {
      username: 'hola',
      email: 'hola@hola.com',
      password: 'hola',
      firstname: 'hola',
      lastname: 'hola'
    }

    component.submit(user);

    expect(signUpSpy.calls.any()).toBe(true, 'signUp called');
  });
});
