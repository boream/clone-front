import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SearchImagesComponent } from './components/search-images/search-images.component';
import { SearchPeopleComponent } from './components/search-people/search-people.component';
import { SearchTagsComponent } from './components/search-tags/search-tags.component';
import { SearchPeopleCardComponent } from './components/search-people-card/search-people-card.component';
import { SearchImageCardComponent } from './components/search-image-card/search-image-card.component';
import { SharedModule } from '../shared/shared.module';
import { SearchNavbarComponent } from './components/search-navbar/search-navbar.component';


@NgModule({
  declarations: [SearchComponent, SearchImagesComponent, SearchPeopleComponent, SearchTagsComponent, SearchImageCardComponent, SearchPeopleCardComponent, SearchNavbarComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
