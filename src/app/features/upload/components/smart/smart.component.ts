import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-smart',
  templateUrl: './smart.component.html',
  styleUrls: ['./smart.component.scss']
})
export class SmartComponent implements OnInit {



  image: File;
  imageSelected: string | ArrayBuffer;

  constructor() { }

  ngOnInit(): void {
  }



  changeFile(event) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSelected = reader.result;
      console.log(this.image);
    }
  }
}
