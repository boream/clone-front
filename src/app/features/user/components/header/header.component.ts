import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  optionsActived:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  showOptions(event) {
    this.optionsActived = !this.optionsActived;
  }
}
