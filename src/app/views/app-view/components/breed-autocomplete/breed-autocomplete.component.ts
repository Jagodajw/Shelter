import { Component, forwardRef, OnInit, Self } from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BreedResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | BreedResponse;
@Component({
  selector: 'app-breed-autocomplete',
  templateUrl: './breed-autocomplete.component.html',
  styleUrls: ['./breed-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => BreedAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class BreedAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public breedList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    @Self() ngControl: NgControl,
    private readonly api: DictionaryService,
    private readonly shelter: ShelterService
  ) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (value) this.value = value;
      },
    });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.breedList$ = this.api.getBreed().pipe(
            map(
              (breedResponse: BreedResponse[]) =>
                breedResponse.map((breed: BreedResponse) => ({
                  ID: breed.ID,
                  name: breed.breed,
                })) as Select[]
            )
          );
        })
      )
      .subscribe();
  }
  protected override handleSetDisabledStateFromOutside(): void {
    if (this.isDisabled) return this.control.disable();
    this.control.enable();
  }

  override handleValueChangeFromOutside(): void {
    const value = this.value as BreedResponse;
    this.control.patchValue({ ...value, name: value.breed });
  }
}
