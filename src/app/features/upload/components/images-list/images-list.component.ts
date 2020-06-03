import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  @Input() imagesList: [];
  @Input() categories: [];

  @Output() updateImagesList = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  update() {
    this.updateImagesList.emit(this.imagesList);
  }

}
