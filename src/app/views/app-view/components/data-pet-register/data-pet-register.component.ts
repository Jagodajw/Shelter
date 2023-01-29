import { Component, OnInit, SkipSelf } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { genderList, sizeList } from 'src/app/data/data-list';
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
  public sizeList: Select[] = sizeList;
  public genderList: Select[] = genderList;

  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {}

  Vaccination({ checked }: MatCheckboxChange): void {
    if (checked) {
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
        .get('date_vaccination')
        ?.enable();
    } else {
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
        .get('date_vaccination')
        ?.disable();
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
        .get('date_vaccination')
        ?.reset();
    }
  }
}
