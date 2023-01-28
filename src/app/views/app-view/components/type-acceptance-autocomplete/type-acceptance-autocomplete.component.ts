import { Component, OnInit, Self } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
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
    // this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (value) this.value = value;
      },
    });
  }

  // private shelterChangeDetector(): void {
  //   this.shelter.selectedShelterChangeDetector$
  //     .pipe(
  //       tap(() => {
  //         this.typeAdoptionList$ = this.api.getTypeAdoptation().pipe(
  //           map(
  //             (typeAdoptionResponse: TypeAdoptionResponse[]) =>
  //               typeAdoptionResponse.map(
  //                 (typeAdoption: TypeAdoptionResponse) => ({
  //                   ID: typeAdoption.ID,
  //                   name: typeAdoption.type_adoption,
  //                 })
  //               ) as Select[]
  //           )
  //         );
  //       })
  //     )
  //     .subscribe();
  // }

  protected override handleSetDisabledStateFromOutside(): void {
    if (this.isDisabled) return this.control.disable();
    this.control.enable();
  }
}
