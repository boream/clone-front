import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComponent } from './upload.component';
import { asyncData } from 'src/test-utils';
import { UserService } from 'src/app/services/user.service';
import { ImageService } from 'src/app/services/image.service';
describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  let userServiceSpy: { getLoggedUser: jasmine.Spy };
  let imageServiceSpy: { 
    saveImage: jasmine.Spy,
    getUserUnpublishedImagesByUsername: jasmine.Spy
  };

  const user = {
    id: '1',
    username: 'usuario',
    email: 'usuario@email.com',
    firstname: 'usuario',
    lastname: 'usuario'
  };

  const image = {
    "id": "string",
    "published": true,
    "file": {
      "id": "string",
      "name": "string",
      "alternativeText": "string",
      "caption": "string",
      "width": 0,
      "height": 0,
      "formats": {},
      "hash": "string",
      "ext": "string",
      "mime": "string",
      "size": 0,
      "url": "string",
      "previewUrl": "string",
      "provider": "string",
      "provider_metadata": {},
      "related": "string"
    },
    "name": "string",
    "published_date": "string",
    "tags": [
      {
        "id": "string",
        "name": "string",
        "images": [
          "string"
        ]
      }
    ],
    "category": {
      "id": "string",
      "Title": "string"
    }
  };

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedUser']);
    imageServiceSpy = jasmine.createSpyObj('ImageService', ['saveImage', 'getUserUnpublishedImagesByUsername']);
    userServiceSpy.getLoggedUser.and.returnValue(asyncData(user));
    imageServiceSpy.saveImage.and.returnValue(asyncData(image));
    imageServiceSpy.getUserUnpublishedImagesByUsername.and.returnValue(asyncData([]))
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call userService on init', () => {
    expect(userServiceSpy.getLoggedUser.calls.count()).toBe(1, 'one call');
  });

  it('should call imageService on imageFileSubmit', () => {
    component.user = user;
    component.imageFileSubmit(image)
    expect(imageServiceSpy.saveImage.calls.count()).toBe(1, 'two call');
  });
});
