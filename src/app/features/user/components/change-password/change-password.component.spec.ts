import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { asyncData } from 'src/test-utils';
import { UserService } from 'src/app/services/user.service';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let userServiceSpy: { 
    getLoggedUser: jasmine.Spy,
    changePassword: jasmine.Spy
  }


  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedUser', 'changePassword'])
    userServiceSpy.getLoggedUser.and.returnValue(asyncData({
      id: '1',
      username: 'hola',
      email: 'hola@hola.com',
      firstname: 'hola',
      lastname: 'hola'
    }));
    userServiceSpy.changePassword.and.returnValue(asyncData({
      success: true
    }));
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
