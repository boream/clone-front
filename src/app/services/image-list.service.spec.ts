import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { getTestScheduler, cold } from 'jasmine-marbles';
import { ImageListService } from './image-list.service';
import { ImageService } from './image.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

describe('ImageListService', () => {
  let imageServiceSpy;

  let service: ImageListService;

  let routerSpy;

  const expectedImage = {
    id: '1',
    name: 'una.jpg',
    url: `${environment.apiUrl}images/uploads/una.jpg`,
    file: {
      url: 'uploads/una.jpg'
    }
  };

  const imageTwo = {
    id: '2',
    name: 'dos.jpg',
    url: `${environment.apiUrl}images/uploads/dos.jpg`,
    file: {
      url: 'uploads/dos.jpg'
    }
  };

  beforeEach(() => {
    imageServiceSpy = jasmine.createSpy('ImageService');
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    //cold('-a', { a: [expectedImage, imageTwo] });
    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: Router, useValue: routerSpy }
      ],
      imports: [
        RouterTestingModule
      ]
    });
    // service = TestBed.inject(ImageListService);
  });

  it('should be created', () => {
    imageServiceSpy.savedImages$ = of([]);
    service = TestBed.inject(ImageListService);
    expect(service).toBeTruthy();
  });

  describe('image$', () => {
    it('should call http if no savedImages', async(() => {
      imageServiceSpy.savedImages$ = cold('-a', { a: [] });
      imageServiceSpy.getImageById = () => {
        return cold('-b', { b: expectedImage })
      }
      service = TestBed.inject(ImageListService);
      service.currentImage$.next('3');

      getTestScheduler().flush();

      const expected = cold('---c', {
        c: expectedImage,
      });

      expect(service.image$).toBeObservable(expected);
    }));

    it('should return null if not currentImage', async(() => {
      imageServiceSpy.savedImages$ = cold('-a', { a: [expectedImage] });
      imageServiceSpy.getImageById = () => {
        return cold('-b', { b: expectedImage })
      }
      service = TestBed.inject(ImageListService);
      service.currentImage$.next('');

      getTestScheduler().flush();

      const expected = cold('--c', {
        c: null,
      });

      expect(service.image$).toBeObservable(expected);
    }));

    it('should call http if it is not found in savedImages', async(() => {
      imageServiceSpy.savedImages$ = cold('a', { a: [expectedImage] });
      imageServiceSpy.getImageById = () => {
        return cold('-b', { b: imageTwo })
      }
      service = TestBed.inject(ImageListService);
      service.currentImage$.next('6');

      getTestScheduler().flush();

      const expected = cold('-c', {
        c: imageTwo,
      });

      expect(service.image$).toBeObservable(expected);
    }));

    it('should return image if found in savedImages', async(() => {
      imageServiceSpy.savedImages$ = cold('-a', { a: [expectedImage, imageTwo, { id: '5' }] });
      imageServiceSpy.getImageById = () => {
        return cold('-b', { b: null })
      }
      service = TestBed.inject(ImageListService);
      service.currentImage$.next('1');
      getTestScheduler().flush();

      const expected = cold('--c', {
        c: expectedImage,
      });

      expect(service.image$).toBeObservable(expected);
    }));
  });

  describe('direction$', () => {
    it('should not navigate if not currentImage', () => {
      imageServiceSpy.savedImages$ = cold('-a', { a: [expectedImage, imageTwo, { id: '5' }] });
      service = new ImageListService(imageServiceSpy as ImageService, routerSpy);
      service.currentImage$.next('');
      service.direction$.next(0);
      getTestScheduler().flush();
      // tick();
    });
  });
});
