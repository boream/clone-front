import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ImageListService } from 'src/app/services/image-list.service';
import { Observable } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnInit {

  @Output() expandEvent = new EventEmitter<any>();

  showButtons$: Observable<Boolean>;
  expand: Boolean = false;

  constructor(private imageListService: ImageListService, private _location: Location) { }

  ngOnInit(): void {
    this.showButtons$ = this.imageListService.fromList$;
  }

  expandImg($event) {
    debugger
    this.expand = !this.expand
    this.expandEvent.emit(this.expand);
  }

  back() {
    this._location.back();
  }
}
