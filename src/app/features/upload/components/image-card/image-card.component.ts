import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { TagsService } from 'src/app/services/tags.service';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() image;

  categories$: Observable<[]>;
  tags$: Observable<[]>;

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
    this.image['categorySelected'] = 'Categories...';
    this.categories$ = this.categoriesService.getCategories();
    this.tags$ = this.tagsService.getTags();
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
    image.categorySelected = category.Title ? category.Title : category;
  }



}
