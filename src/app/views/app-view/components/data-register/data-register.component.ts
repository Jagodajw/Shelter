import { Component, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
  public sterilization: boolean = false;
  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {}

  Sterilization({ checked }: MatCheckboxChange): void {
    if (checked) {
      (this.formGroupDirective.control.get('register') as FormGroup)
        .get('date_sterilization')
        ?.enable();
    } else {
      (this.formGroupDirective.control.get('register') as FormGroup)
        .get('date_sterilization')
        ?.disable();
    }
  }

  public castratedList: Select[] = [
    { ID: 'castrated', name: 'pets.filterNoCastrated' },
    { ID: 'noCastrated', name: 'pets.filterCastrated' },
  ];
}
