import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/types/image';
//import { SearchService } from 'src/app/services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Input() listImages: Image[];

  constructor() { }

  ngOnInit(): void {
  }

}
