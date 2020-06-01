import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  styleUrls: ['./smart.component.scss']
})
export class SmartComponent implements OnInit {


  imagesListTest = [{ title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }, { title: '', url: '/assets/img/background_desktop.png', tags: [], categories: [] }]


  constructor() { }

  ngOnInit(): void {
  }

  printList() {
    console.log(this.imagesListTest);
  }
}
