import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Image } from '../../../../types/image';



@Component({
  selector: 'app-img-info',
  templateUrl: './img-info.component.html',
  styleUrls: ['./img-info.component.scss']
})
export class ImgInfoComponent implements OnInit, OnChanges {

  @Input() image: Image;
  @Output() direction = new EventEmitter<Number>();

  constructor() { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log('images changes', changes);
  }

  ngOnInit(): void {
  }

}
