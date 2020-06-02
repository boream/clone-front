import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headersub',
  templateUrl: './headersub.component.html',
  styleUrls: ['./headersub.component.scss']
})
export class HeadersubComponent implements OnInit {

  @Input() categories: string[] = ['Example'];
  constructor() { }

  ngOnInit(): void {
  }

}
