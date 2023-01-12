import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-province-autocomplete',
  templateUrl: './province-autocomplete.component.html',
  styleUrls: ['./province-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProvinceAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ProvinceAutocompleteComponent  extends ControlValueAccessorsAbstract implements OnInit {
 public readonly provinceList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.provinceList$ = this.api.getP().pipe(
      map(
        (speciesResponse: ProvinceResponse[]) =>
          speciesResponse.map((species: ProvinceResponse) => ({
            id: species.ID,
            name: species.species,
          })) as Select[]
      )
    );
  }

  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
