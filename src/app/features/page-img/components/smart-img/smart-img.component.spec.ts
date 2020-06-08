import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartImgComponent } from './smart-img.component';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ImageListService } from 'src/app/services/image-list.service';

describe('SmartImgComponent', () => {
  let component: SmartImgComponent;
  let fixture: ComponentFixture<SmartImgComponent>;
  let imageListServiceSpy;

  beforeEach(async(() => {
    imageListServiceSpy = jasmine.createSpy('ImageListService');
    spyOnProperty(imageListServiceSpy, 'image$').and.returnValue(of(null));
    imageListServiceSpy.currentImage$.and.returnValue(new BehaviorSubject(''));
    imageListServiceSpy.direction$.and.returnValue(new BehaviorSubject(0));
    TestBed.configureTestingModule({
      declarations: [ SmartImgComponent ],
      providers: [
        { provide: ImageListService, useValue: imageListServiceSpy }
      ]
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
