import { Component, OnInit, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { TypeAcceptanceResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';
type ReturnValue = string | null | Select;
@Component({
  selector: 'app-type-acceptance-autocomplete',
  templateUrl: './type-acceptance-autocomplete.component.html',
  styleUrls: ['./type-acceptance-autocomplete.component.scss'],
})
export class TypeAcceptanceAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public typeAcceptanceList$!: Observable<Select[]>;
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
          this.typeAcceptanceList$ = this.api.getTypeAcceptance().pipe(
            map(
              (typeAcceptaceResponse: TypeAcceptanceResponse[]) =>
                typeAcceptaceResponse.map(
                  (typeAcceptace: TypeAcceptanceResponse) => ({
                    ID: typeAcceptace.ID,
                    name: typeAcceptace.type_acceptance,
                  })
                ) as Select[]
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
}
