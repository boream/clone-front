import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersubComponent } from './headersub.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { asyncData } from 'src/test-utils';

describe('HeadersubComponent', () => {
  let component: HeadersubComponent;
  let fixture: ComponentFixture<HeadersubComponent>;

  let categoryServiceSpy: { getCategories: jasmine.Spy };

  beforeEach(async(() => {
    categoryServiceSpy = jasmine.createSpyObj('CategoriesService', ['getCategories']);
    categoryServiceSpy.getCategories.and.returnValue(asyncData([
      {
        Title: 'hola'
      }
    ]));
    TestBed.configureTestingModule({
      declarations: [ HeadersubComponent ],
      providers: [
        { provide: CategoriesService, useValue: categoryServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
