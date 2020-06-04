import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Image } from 'src/app/types/image';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  @Input() imagesList: Image[];

  @Output() updateImagesList = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
