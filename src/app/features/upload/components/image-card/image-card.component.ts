import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/types/tag';
import { switchMap } from 'rxjs/operators';
import { Image } from 'src/app/types/image';
import { ImageService } from 'src/app/services/image.service';
import { Category } from 'src/app/types/category';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit {

  @Input() image: Image;

  categories$: Observable<Category[]>;
  tags: Tag[];
  defaultCategory = { title: '' };
  subscriptions: Subscription[] = [];
  isSelected = {
    categories: false,
    tags: false,
  }
  imgTitle: string = '';
  invalidField = { title: false, category: false };

  constructor(
    private categoriesService: CategoriesService,
    private tagsService: TagsService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.imgTitle = this.image['name'];
    this.invalidField = this.image['error'] ? this.image['error'] : { title: false, category: false };
    this.categories$ = this.categoriesService.getCategories();
    this.subscriptions.push(
      this.tagsService.getTags().subscribe((tags: Tag[]) => {
        this.image.tags.map(tag => { tag['checked'] = true; return tag });
        this.tags = tags.map(tag => this.image.tags.find(imgTag => imgTag.id === tag.id) || tag);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  toggleSelectCategories(image: Image) {
    this.isSelected.categories = !this.isSelected.categories;
    this.isSelected.tags = false;
  }

  toggleSelectTags(image: Image) {
    this.isSelected.tags = !this.isSelected.tags;
    this.isSelected.categories = false;
  }

  updateTitle(title: String) {
    if (this.invalidField && title !== '') {
      this.invalidField.title = false;
    } else {
      this.invalidField.title = true;
    }
    this.image['name'] = title;
    this.updateImage();
  }

  selectCategory(image: Image, category: Category) {
    if (category.title) {
      image.category = category;
      if (this.invalidField) {
        this.invalidField.category = false;
      }
    } else {
      this.invalidField.category = true;
      image.category = null;
    }
    this.updateImage();
  }

  selectTag(tag: Tag) {
    this.image.tags.push(tag);
    this.updateImage();
  }

  unSelectTag(tag: Tag, image: Image) {
    const imageList = this.image.tags.filter((t: Tag) => t.id !== tag.id);
    image.tags = imageList;
    this.updateImage();
  }

  addTag(tag: Tag) {
    this.subscriptions.push(
      this.tagsService.addTag(tag)
        .pipe(
          switchMap(_ => this.tagsService.getTags())
        )
        .subscribe((tags: Tag[]) => this.tags = tags)
    )
  }

  private updateImage() {
    this.subscriptions.push(
      this.imageService.updateImage(this.image).subscribe(res => {
        if (!res.category) {
          res.category = this.defaultCategory
        }
      })
    )
  }

}
