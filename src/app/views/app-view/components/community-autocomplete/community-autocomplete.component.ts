import { Component, forwardRef, OnInit, Self } from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommuneResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select;
@Component({
  selector: 'app-community-autocomplete',
  templateUrl: './community-autocomplete.component.html',
  styleUrls: ['./community-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CommunityAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class CommunityAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  public communityList$!: Observable<Select[]>;
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
          this.communityList$ = this.api.getCommune().pipe(
            map(
              (communeResponse: CommuneResponse[]) =>
                communeResponse.map((commune: CommuneResponse) => ({
                  ID: commune.ID,
                  name: commune.commune,
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
}
