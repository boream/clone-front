import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseAccountComponent } from './close-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncData } from 'src/test-utils';

describe('CloseAccountComponent', () => {
  let component: CloseAccountComponent;
  let fixture: ComponentFixture<CloseAccountComponent>;
  let userServiceSpy: { getLoggedUser: jasmine.Spy };

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getLoggedUser']);
    TestBed.configureTestingModule({
      declarations: [ CloseAccountComponent ],
      providers:[
        { provide: UserService, useValue: userServiceSpy }
      ],
      imports: [ 
        ReactiveFormsModule,
        RouterTestingModule
       ]
    });

    userServiceSpy.getLoggedUser.and.returnValue(asyncData({
      id: '1',
      username: 'uno',
      email: 'uno@email.com'
    }));

    fixture = TestBed.createComponent(CloseAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
