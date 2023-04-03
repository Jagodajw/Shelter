import { Component, EventEmitter, OnInit, Output, Self } from '@angular/core';
import { FormControl, NgControl, Validators } from '@angular/forms';
import { SpeciesResponse } from 'backend/src/views/DictionaryView';
import { Observable, map, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

export type SpeciesAutocompleteReturnValue =
  | string
  | null
  | Select
  | SpeciesResponse;
@Component({
  selector: 'app-species-autocomplete',
  templateUrl: './species-autocomplete.component.html',
  styleUrls: ['./species-autocomplete.component.scss'],
})
export class SpeciesAutocompleteComponent
  extends ControlValueAccessorsAbstract<SpeciesAutocompleteReturnValue>
  implements OnInit
{
  @Output() private change: EventEmitter<SpeciesAutocompleteReturnValue> =
    new EventEmitter<SpeciesAutocompleteReturnValue>();

  public speciesList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl(
    null,
    Validators.required
  );

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
        if ((this.value as any)?.ID === value?.ID && typeof value !== 'string')
          return;
        if (value) {
          this.value = value;
          this.change.emit(value);
        }
      },
    });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.speciesList$ = this.api.getSpecies().pipe(
            map(
              (speciesResponse: SpeciesResponse[]) =>
                speciesResponse.map((species: SpeciesResponse) => ({
                  ID: species.ID,
                  name: species.species,
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
    this.control.patchValue(
      this.isValueAsSpeciesResponse(this.value)
        ? { ...this.value, name: this.value.species }
        : this.value
    );
  }

  private isValueAsSpeciesResponse(
    value: SpeciesAutocompleteReturnValue
  ): value is SpeciesResponse {
    return (value as SpeciesResponse)?.species !== undefined;
  }
}
