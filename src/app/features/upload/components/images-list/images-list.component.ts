import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/types/image';

@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss']
})
export class ImagesListComponent implements OnInit {

  @Input() imagesList: Image[];
  @Input() categories: [];

  imagesListTest = [{ title: '', url: '/assets/img/background_desktop.png', isSelected: {categories: false, tags: false}, tags: ['nature', 'green'], categorySelected:'Categories...', categories: [] }, { title: '', url: '/assets/img/background_desktop.png', isSelected: {categories: false, tags: false}, tags: ['nature', 'green'], categorySelected:'Categories...', categories: [] }, { title: '', url: '/assets/img/background_desktop.png', isSelected: {categories: false, tags: false}, tags: ['nature', 'green'], categorySelected:'Categories...', categories: [] }, { title: '', url: '/assets/img/background_desktop.png', isSelected: {categories: false, tags: false}, tags: ['nature', 'green'], categorySelected:'Categories...', categories: [] }, { title: '', url: '/assets/img/background_desktop.png', isSelected: {categories: false, tags: false}, tags: ['nature', 'green'], categorySelected:'Categories...', categories: [] }]
  categoriesTest = ['Categories...', 'Nature', 'Landscape']
  constructor() { }

  ngOnInit(): void {
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
