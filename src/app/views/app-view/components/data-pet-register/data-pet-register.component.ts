import { Component, OnInit, SkipSelf } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
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
    { ID: 0, name: 'kot' },
    { ID: 1, name: 'pies' },
  ];

  public sizeList: Select[] = [
    { ID: 'small', name: 'size.small' },
    { ID: 'medium', name: 'size.medium' },
    { ID: 'large', name: 'size.large' },
  ];

  public genderList: Select[] = [
    { ID: 'female', name: 'gender.female' },
    { ID: 'male', name: 'gender.male' },
  ];
}
