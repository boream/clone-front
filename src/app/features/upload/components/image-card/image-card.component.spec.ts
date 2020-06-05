import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardComponent } from './image-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImageCardComponent', () => {
  let component: ImageCardComponent;
  let fixture: ComponentFixture<ImageCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCardComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCardComponent);
    component = fixture.componentInstance;
    component.image = {
      file: null,
      published: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
