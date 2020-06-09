import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchImagesComponent } from './components/search-images/search-images.component';
import { SearchPeopleComponent } from './components/search-people/search-people.component';
import { SearchTagsComponent } from './components/search-tags/search-tags.component';


@NgModule({
  declarations: [SearchComponent, SearchImagesComponent, SearchPeopleComponent, SearchTagsComponent,],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
