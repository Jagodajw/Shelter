import { Component, Input, OnInit, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { BreedResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, Subscription, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | BreedResponse;
@Component({
  selector: 'app-breed-autocomplete',
  templateUrl: './breed-autocomplete.component.html',
  styleUrls: ['./breed-autocomplete.component.scss'],
})
export class BreedAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  @Input() set speciesId(newSpeciesId: number | undefined | null) {
    if (this.sub) this.sub.unsubscribe();
    this.shelterChangeDetector(newSpeciesId);
  }
  private sub?: Subscription;
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
    // this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (value) this.value = value;
      },
    });
  }

  private shelterChangeDetector(speciesId: number | null | undefined): void {
    this.sub = this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.breedList$ = this.api.getBreed(speciesId ?? undefined).pipe(
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
    this.control.patchValue(
      this.isValueAsBreedResponse(this.value)
        ? { ...this.value, name: this.value.breed }
        : this.value
    );
  }

  private isValueAsBreedResponse(value: ReturnValue): value is BreedResponse {
    return (value as BreedResponse)?.breed !== undefined;
  }
}
