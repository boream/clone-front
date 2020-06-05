import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartImgComponent } from './smart-img.component';

describe('SmartImgComponent', () => {
  let component: SmartImgComponent;
  let fixture: ComponentFixture<SmartImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
