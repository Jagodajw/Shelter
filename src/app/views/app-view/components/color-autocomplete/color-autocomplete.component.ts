import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-color-autocomplete',
  templateUrl: './color-autocomplete.component.html',
  styleUrls: ['./color-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ColorAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public readonly colorList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.colorList$ = this.api.getColors().pipe(
      map(
        (ColorResponse: ColorResponse[]) =>
          ColorResponse.map((color: ColorResponse) => ({
            id: color.ID,
            name: color.color,
          })) as Select[]
      )
    );
  }

  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
