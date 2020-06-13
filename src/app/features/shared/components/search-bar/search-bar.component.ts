import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchForm: FormGroup;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      currentSearch: new FormControl('', Validators.required)
    });
  }

  onSearchSubmit(form: FormGroup) {
    const query = form.controls.currentSearch.value;
    this.router.navigateByUrl(`search/${query}/images`);
  }

}
