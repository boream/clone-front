import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { asyncData } from 'src/test-utils';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let userServiceSpy: { 
    getLoggedUser: jasmine.Spy,
    updateUser: jasmine.Spy
  }

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedUser', 'updateUser'])
    userServiceSpy.getLoggedUser.and.returnValue(asyncData({
      id: '1',
      username: 'hola',
      email: 'hola@hola.com',
      firstname: 'hola',
      lastname: 'hola'
    }));
    userServiceSpy.updateUser.and.returnValue(asyncData({
      success: true
    }));
    TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ],
      imports: [
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
