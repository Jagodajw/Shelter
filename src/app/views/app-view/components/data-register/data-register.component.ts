import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-register',
  templateUrl: './data-register.component.html',
  styleUrls: ['./data-register.component.scss'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
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
