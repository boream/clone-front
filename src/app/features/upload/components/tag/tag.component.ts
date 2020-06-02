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
  @Output() tagAdded = new EventEmitter();

  searchText: string = '';
  filteredList: Tag[] = [];

  constructor() { }

  ngOnInit(): void {
    this.filteredList = this.tags;
  }

  onChecked(tag) {
    if (!tag.checked) {
      tag['checked'] = true;
      this.tagChecked.emit(tag);
    } else {
      tag['checked'] = false;
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

  addTag(tag: string) {
    if (tag) {
      const newTag = {
        name: tag
      }
      this.tagAdded.emit(newTag);
    }
  }


}
