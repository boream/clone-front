import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  @Input() imagesList: Image[];
  @Input() categories: [];

  imagesListTest = [{ title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }]

  constructor() { }

  ngOnInit(): void {
  }

}
