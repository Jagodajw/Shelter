import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommuneResponse } from 'backend/src/models/DictionaryModel';
import { map, Observable } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { DictionaryService } from '../../services/api/dictionary.service';
import { Select } from '../select/select';

@Component({
  selector: 'app-community-autocomplete',
  templateUrl: './community-autocomplete.component.html',
  styleUrls: ['./community-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CommunityAutocompleteComponent),
      multi: true,
    },
  ],
})
export class CommunityAutocompleteComponent
  extends ControlValueAccessorsAbstract
  implements OnInit
{
  public readonly communityList$: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(private readonly api: DictionaryService) {
    super();
    this.communityList$ = this.api.getCommune().pipe(
      map(
        (communeResponse: CommuneResponse[]) =>
          communeResponse.map((commune: CommuneResponse) => ({
            id: commune.ID,
            name: commune.commune,
          })) as Select[]
      )
    );
  }

  ngOnInit(): void {}

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
}
