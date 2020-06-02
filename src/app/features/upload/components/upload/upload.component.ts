import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  imagesListTest = [{ title: '', url: '/assets/img/background_desktop.png', tags: [], category: {} }, { title: '', url: '/assets/img/background_desktop.png', tags: [], category: '' }, { title: '', url: '/assets/img/background_desktop.png', tags: [], category: '' }, { title: '', url: '/assets/img/background_desktop.png', tags: [], category: '' }, { title: '', url: '/assets/img/background_desktop.png', tags: [], category: '' }]

  constructor() { }


  ngOnInit(): void {
  }


  printList() {
    console.log(this.imagesListTest);
  }
}
