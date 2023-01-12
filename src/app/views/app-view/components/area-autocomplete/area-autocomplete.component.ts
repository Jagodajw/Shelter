import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AreaResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-area-autocomplete',
  templateUrl: './area-autocomplete.component.html',
  styleUrls: ['./area-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaAutocompleteComponent),
      multi: true,
    },
  ],
})
export class AreaAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public readonly areaList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.areaList$ = this.api.getArea().pipe(
      map(
        (areaResponse: AreaResponse[]) =>
          areaResponse.map((area: AreaResponse) => ({
            id: area.ID,
            name: area.area,
          })) as Select[]
      )
    );
  }

  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
