import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPeopleComponent } from './components/search-people/search-people.component';
import { SearchImagesComponent } from './components/search-images/search-images.component';
import { SearchTagsComponent } from './components/search-tags/search-tags.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'images'
  },
  {
    path: 'images',
    component: SearchImagesComponent,
  },
  {
    path: 'people',
    component: SearchPeopleComponent,
  },
  {
    path: 'tags',
    component: SearchTagsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
