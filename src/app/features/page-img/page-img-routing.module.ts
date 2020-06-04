import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { SmartImgComponent } from './components/smart-img/smart-img.component';


const routes: Routes = [
  {
    path: '',
    component: SmartImgComponent,
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageImgRoutingModule { }
