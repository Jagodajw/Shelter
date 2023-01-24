import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-pet-register',
  templateUrl: './data-pet-register.component.html',
  styleUrls: ['./data-pet-register.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class DataPetRegisterComponent implements OnInit {
  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {}

  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];

  public sizeList: Select[] = [
    { id: 'small', name: 'size.small' },
    { id: 'medium', name: 'size.medium' },
    { id: 'large', name: 'size.large' },
  ];

  public genderList: Select[] = [
    { id: 'female', name: 'gender.female' },
    { id: 'male', name: 'gender.male' },
  ];

  Vaccination({ checked }: MatCheckboxChange): void {
    if (checked) {
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
        .get('date_vaccination')
        ?.enable();
    } else {
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
        .get('date_vaccination')
        ?.disable();
    }
  }
}
