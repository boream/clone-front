import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData } from 'src/test-utils';
import { UserService } from 'src/app/services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: {
    getUserByUsername: jasmine.Spy,
    getUserPublishedImagesByUsername: jasmine.Spy,
    getUserUnpublishedImagesByUsername: jasmine.Spy,
  };

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserByUsername',
      'getUserPublishedImagesByUsername',
      'getUserUnpublishedImagesByUsername'
    ]);
    userServiceSpy.getUserByUsername.and.returnValue(asyncData({
      username: 'hola'
    }));
    userServiceSpy.getUserPublishedImagesByUsername.and.returnValue(asyncData([
      {
        id: '1',
        url: ''
      },
      {
        id: '2',
        url: ''
      }
    ]));
    userServiceSpy.getUserUnpublishedImagesByUsername.and.returnValue(asyncData([
      {
        id: '1',
        url: ''
      },
      {
        id: '2',
        url: ''
      }
    ]));
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ],
      imports: [
        RouterTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
