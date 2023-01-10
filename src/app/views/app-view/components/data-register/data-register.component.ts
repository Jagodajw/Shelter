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

  public castratedList: Select[] = [
    { id: 'castrated', name: 'pets.filterNoCastrated' },
    { id: 'noCastrated', name: 'pets.filterCastrated' },
  ];
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }
}
