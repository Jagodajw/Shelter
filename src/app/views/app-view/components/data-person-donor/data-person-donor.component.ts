import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ButtonFilter } from '../button-filter/button-filter';
import { Select } from '../select/select';

type PersonType = 'natural' | 'legal' | 'found';

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
  public personType: PersonType = 'natural';
  public blockInput: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  public filtersPeople: ButtonFilter<PersonType>[] = [
    { id: 'natural', name: 'Osoba fizyczna' },
    { id: 'legal', name: 'Osoba prawna' },
    { id: 'found', name: 'znaleziony' },
  ];
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }

  onChangeSelect(event: PersonType): void {
    this.personType = event;
    if (this.personType === 'legal') {
      this.blockInput = true;
    } else {
      this.blockInput = false;
    }
  }
}
