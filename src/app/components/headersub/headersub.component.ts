import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../types/category';

@Component({
  selector: 'app-headersub',
  templateUrl: './headersub.component.html',
  styleUrls: ['./headersub.component.scss']
})
export class HeadersubComponent implements OnInit {

  //@Input() categories: string[] = ['Example'];
  public categories = [];

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res: any[]) => {
      this.categories = res;
    })
  }

}
