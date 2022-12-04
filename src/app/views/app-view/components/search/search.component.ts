import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { SearchResult } from './search.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchComponent),
      multi: true,
    },
  ],
})
export class SearchComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  @Input() placeholder = '';
  public search: FormControl = new FormControl();
  // public searchResults: Observable<SearchResult[]> | undefined;
  // public minimumChars: Observable<boolean> | undefined;
  // public noFound: Observable<boolean> | undefined;
  constructor(private formBuilder: FormBuilder) {
    super();
  }

  
  public writeValue(value: unknown): void {}

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
