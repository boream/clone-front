import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData } from 'src/test-utils';
import { UserService } from 'src/app/services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

fdescribe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userServiceSpy: {
    getUserByUsername: jasmine.Spy,
    getUserPublishedImagesByUsername: jasmine.Spy,
    getUserUnpublishedImagesByUsername: jasmine.Spy,
  };

  let imageServiceSpy: {
    getUserPublishedImagesByUsername: jasmine.Spy
  };

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', [
      'getUserByUsername',
      'getUserPublishedImagesByUsername',
      'getUserUnpublishedImagesByUsername'
    ]);
    imageServiceSpy = jasmine.createSpyObj('ImageService', [
      'getUserPublishedImagesByUsername'
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
    imageServiceSpy.getUserPublishedImagesByUsername.and.returnValue(
      asyncData([])
    );
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy }
      ],
      imports: [
        RouterTestingModule.withRoutes([{
          path: ':username',
          component: UserComponent
        }])
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
