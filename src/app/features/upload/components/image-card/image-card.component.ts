import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() image;

  categoriesTest = ['Categories...', 'Nature', 'Landscape']
  tags = ['nature', 'green']

  constructor() { }

  ngOnInit(): void {
    this.image['isSelected'] = {
      image: false,
      categories: false,
      tags: false,
    }
    this.image['categorySelected'] = 'Categories...'
  }

  toggleSelectCategories(image) {
    image.isSelected.categories = !image.isSelected.categories;
    image.isSelected.tags = false;
  }

  toggleSelectTags(image) {
    image.isSelected.tags = !image.isSelected.tags;
    image.isSelected.categories = false;
  }

  selectCategory(image, category) {
    image.categorySelected = category;
  }

  selectTag(image, tag) {

  }


}
