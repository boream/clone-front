import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-search-image-card',
  templateUrl: './search-image-card.component.html',
  styleUrls: ['./search-image-card.component.scss']
})
export class SearchImageCardComponent implements OnInit {

  @Input() image: Image;

  constructor() { }

  ngOnInit(): void {

  }

}
