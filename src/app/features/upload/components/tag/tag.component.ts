import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/types/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input() tags: Tag[];

  @Output() tagChecked = new EventEmitter();
  @Output() tagUnChecked = new EventEmitter();

  searchText: string = '';
  filteredList: Tag[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredList = this.tags;
  }

  onChecked(e, tag) {
    if (e.target.checked === true) {
      this.tagChecked.emit(tag);
    } else {
      this.tagUnChecked.emit(tag);
    }
  }

  filterTags(text) {
    if (!text) {
      this.filteredList = this.tags;
    } else {
      const searchRegex = new RegExp(text, 'i');
      this.filteredList = this.tags.filter(tag => searchRegex.test(tag.name.toLowerCase()));
    }
  }


}
