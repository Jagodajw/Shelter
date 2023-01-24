import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SkipSelf,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ButtonFilter } from '../button-filter/button-filter';
import { Select } from '../select/select';

type PersonType = 'private' | 'legal' | 'none';

@Component({
  selector: 'app-data-person-donor',
  templateUrl: './data-person-donor.component.html',
  styleUrls: ['./data-person-donor.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class DataPersonDonorComponent implements OnInit {
  @Output() personTypeEmit: EventEmitter<PersonType> =
    new EventEmitter<PersonType>();
  public personType: PersonType = 'private';
  public blockInput: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  public filtersPeople: ButtonFilter<PersonType>[] = [
    { id: 'private', name: 'Osoba fizyczna' },
    { id: 'legal', name: 'Osoba prawna' },
    { id: 'none', name: 'znaleziony' },
  ];
  public arrayOfSpecies: Select[] = [
    { ID: 0, name: 'kot' },
    { ID: 1, name: 'pies' },
  ];
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }

  onChangeSelect(event: PersonType): void {
    this.personTypeEmit.emit(event);
    this.personType = event;
    if (this.personType === 'legal') {
      this.blockInput = true;
    } else {
      this.blockInput = false;
    }
  }
}
