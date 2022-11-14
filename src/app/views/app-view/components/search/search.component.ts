import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { SearchResult } from './search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeholder = '';
  public search: FormControl = new FormControl();
  // public searchResults: Observable<SearchResult[]> | undefined;
  // public minimumChars: Observable<boolean> | undefined;
  // public noFound: Observable<boolean> | undefined;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  public clearForm(): void {
    //zrobic wyszukiwanie tutaj po kliku + errror
    this.search.setValue('');
  }

  keyDownFunction(event: any) {
    //zrobic wyszukiwanie tutaj po enterze + errror
    if (event.code === 'Enter') {
      this.clearForm();
    }
  }
}
