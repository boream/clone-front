import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header-img.component';
import { UserService } from 'src/app/services/user.service';
import { asyncData } from 'src/test-utils';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '../home/home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceSpy: {
    getLoggedUser: jasmine.Spy,
    getLoggedUserAvatar: jasmine.Spy
  }

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getLoggedUser',
      'getLoggedUserAvatar'
    ]);

    userServiceSpy.getLoggedUser.and.returnValue(asyncData({
      id: '1',
      username: 'hola',
      firstname: 'hola',
      lastname: 'hola'
    }));
    userServiceSpy.getLoggedUserAvatar.and.returnValue(asyncData('hola'))
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: 'home',
          component: HomeComponent
        }])
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
