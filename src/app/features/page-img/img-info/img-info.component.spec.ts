import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgInfoComponent } from './img-info.component';

describe('ImgInfoComponent', () => {
  let component: ImgInfoComponent;
  let fixture: ComponentFixture<ImgInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
