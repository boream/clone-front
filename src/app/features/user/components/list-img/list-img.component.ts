import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-img',
  templateUrl: './list-img.component.html',
  styleUrls: ['./list-img.component.scss']
})
export class ListImgComponent implements OnInit {


  @Input() listImages: Array<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
