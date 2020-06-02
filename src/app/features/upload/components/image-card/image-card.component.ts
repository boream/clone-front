import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/types/tag';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() image;

  @Output() update = new EventEmitter();

  categories$: Observable<[]>;
  tags: [];

  constructor(
    private categoriesService: CategoriesService,
    private tagsService: TagsService
  ) { }

  ngOnInit(): void {
    this.image['isSelected'] = {
      image: false,
      categories: false,
      tags: false,
    }
    this.image.category = {Title: 'Categories...'};
    this.categories$ = this.categoriesService.getCategories();
    this.tagsService.getTags().subscribe(tags => this.tags = tags);
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
    if (category.Title) {
      image.category.Title = category.Title;
      image.category = category;
    } else {
      image.category = {};
    }
    this.update.emit(image);
  }

  selectTag(tag: Tag, image){
    this.image.tags.push(tag);
    this.update.emit(image);
  }

  unSelectTag(tag: Tag, image) {
    const imageList = this.image.tags.filter((t: Tag) => t.id !== tag.id);
    image.tags = imageList;
    this.update.emit(image);
  }


}
