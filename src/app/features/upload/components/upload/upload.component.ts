import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  imagesListTest = [{ title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }]

  constructor() { }


  ngOnInit(): void {
  }


  printList() {
    console.log(this.imagesListTest);
  }
}
