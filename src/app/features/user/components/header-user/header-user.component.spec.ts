import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderUserComponent } from './header-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData } from 'src/test-utils';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;
  let userServiceSpy: { getLoggedUser: jasmine.Spy };
  let authServiceSpy: { logout: jasmine.Spy };

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedUser']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    userServiceSpy.getLoggedUser.and.returnValue(asyncData({
      username: 'hola'
    }));
    TestBed.configureTestingModule({
      declarations: [ HeaderUserComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
