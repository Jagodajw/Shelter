import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BreedResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-breed-autocomplete',
  templateUrl: './breed-autocomplete.component.html',
  styleUrls: ['./breed-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BreedAutocompleteComponent),
      multi: true,
    },
  ],
})
export class BreedAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public readonly breedList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.breedList$ = this.api.getBreed().pipe(
      map(
        (breedResponse: BreedResponse[]) =>
          breedResponse.map((breed: BreedResponse) => ({
            id: breed.ID,
            name: breed.breed,
          })) as Select[]
      )
    );
  }

  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
