import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeAdoptionResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select;

@Component({
  selector: 'app-type-adoption-autocomplete',
  templateUrl: './type-adoption-autocomplete.component.html',
  styleUrls: ['./type-adoption-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TypeAdoptionAutocompleteComponent),
      multi: true,
    },
  ],
})
export class TypeAdoptionAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public typeAdoptionList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    private readonly api: DictionaryService,
    private readonly shelter: ShelterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (this.onChange) this.onChange(value);
      },
    });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.typeAdoptionList$ = this.api.getTypeAdoptation().pipe(
            map(
              (typeAdoptionResponse: TypeAdoptionResponse[]) =>
                typeAdoptionResponse.map(
                  (typeAdoption: TypeAdoptionResponse) => ({
                    ID: typeAdoption.ID,
                    name: typeAdoption.type_adoption,
                  })
                ) as Select[]
            )
          );
        })
      )
      .subscribe();
  }

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.control.disable();
    this.control.enable();
  }
}
