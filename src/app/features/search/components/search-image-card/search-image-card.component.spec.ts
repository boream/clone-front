import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchImageCardComponent } from './search-image-card.component';

describe('SearchImageCardComponent', () => {
  let component: SearchImageCardComponent;
  let fixture: ComponentFixture<SearchImageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchImageCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
