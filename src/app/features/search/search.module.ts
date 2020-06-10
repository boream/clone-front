import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchImagesComponent } from './components/search-images/search-images.component';
import { SearchPeopleComponent } from './components/search-people/search-people.component';
import { SearchTagsComponent } from './components/search-tags/search-tags.component';
import { SearchPeopleCardComponent } from './components/search-people-card/search-people-card.component';
import { SearchImageCardComponent } from './components/search-image-card/search-image-card.component';


@NgModule({
  declarations: [SearchComponent, SearchImagesComponent, SearchPeopleComponent, SearchTagsComponent, SearchImageCardComponent, SearchPeopleCardComponent],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
