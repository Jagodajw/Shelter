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
    { ID: 'castrated', name: 'pets.filterNoCastrated' },
    { ID: 'noCastrated', name: 'pets.filterCastrated' },
  ];
}
