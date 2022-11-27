import { Component, OnInit } from '@angular/core';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-register',
  templateUrl: './data-register.component.html',
  styleUrls: ['./data-register.component.scss'],
})
export class DataRegisterComponent implements OnInit {
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
}
