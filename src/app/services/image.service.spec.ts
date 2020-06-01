import { TestBed } from '@angular/core/testing';

import { ImageService } from './image.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Image } from '../types/image';
import { environment } from 'src/environments/environment';

const testUrl = environment.apiUrl;

describe('ImageService', () => {
  let service: ImageService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ImageService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save an image', () => {
    const newImage: Image = {
      published: false,
      title: 'un titulo',
      file: new File(["asdfasfdasdfasdfasdfasdfasd"], "filename")
    };

    const expectedImage: any = {
      "id": "string",
      "published": true,
      "file": {
        "id": "string",
        "name": "string",
        "alternativeText": "string",
        "caption": "string",
        "width": 0,
        "height": 0,
        "formats": {},
        "hash": "string",
        "ext": "string",
        "mime": "string",
        "size": 0,
        "url": "string",
        "previewUrl": "string",
        "provider": "string",
        "provider_metadata": {},
        "related": "string"
      },
      "name": "string",
      "published_date": "string",
      "tags": [
        {
          "id": "string",
          "name": "string",
          "images": [
            "string"
          ]
        }
      ],
      "category": {
        "id": "string",
        "Title": "string"
      }
    }

    const matchFn = req => {
      return req.url === service.imagesUrl
        && req.method === 'POST'
        && req.params
    } 

    service.saveImage(newImage).subscribe(
      data => expect(data).toEqual(expectedImage, 'should return the updated image'),
      fail
    );

    const req = httpTestingController.expectOne(matchFn);
    expect(req.request.method).toEqual('POST');

    req.flush(expectedImage)

  });
});
