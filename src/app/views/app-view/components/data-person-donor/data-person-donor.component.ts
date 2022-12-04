import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { ButtonFilter } from '../button-filter/button-filter';
import { Select } from '../select/select';

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
  public personType: number = 0;
  public blockInput: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  public filtersPeople: ButtonFilter[] = [
    { id: 0, name: 'Osoba fizyczna' },
    { id: 1, name: 'Osoba prawna' },
    { id: 2, name: 'znaleziony' },
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

  onChangeSelect(event: number): void {
    this.personType = event;
    if (this.personType === 1) {
      this.blockInput = true;
    } else {
      this.blockInput = false;
    }
  }
}
