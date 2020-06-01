import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss']
})
export class ListImgComponent implements OnInit {


  @Input() listImages: Image[];

  constructor() { }

  ngOnInit(): void {
  }

}
