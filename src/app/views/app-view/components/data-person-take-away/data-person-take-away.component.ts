import { Component, OnInit } from '@angular/core';
import { ButtonFilter } from '../button-filter/button-filter';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-person-take-away',
  templateUrl: './data-person-take-away.component.html',
  styleUrls: ['./data-person-take-away.component.scss'],
})
export class DataPersonTakeAwayComponent implements OnInit {
  public personType: number = 0;
  public blockInput: boolean = false;
  constructor() {}

  ngOnInit(): void {}
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
  public filtersPeople: ButtonFilter[] = [
    { id: 0, name: 'Osoba fizyczna' },
    { id: 1, name: 'Osoba prawna' },
    { id: 2, name: 'znaleziony' },
  ];
  onChangeSelect(event: number): void {
    this.personType = event;
    if (this.personType === 1) {
      this.blockInput = true;
    } else {
      this.blockInput = false;
    }
  }
}
