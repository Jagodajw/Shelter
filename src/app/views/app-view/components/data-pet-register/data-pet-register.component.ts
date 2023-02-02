import { Component, OnInit, SkipSelf } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { map, mergeMap, Observable, of } from 'rxjs';
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
  public speciesId!: Observable<number | undefined>;

  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.speciesId =
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
        .get('species')
        ?.valueChanges.pipe(
          map((species: Select | null | string) => {
            (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
              .get('breed')
              ?.patchValue('');
            return ((species as Select)?.ID || undefined) as number | undefined;
          })
        ) ?? of(undefined);
  }

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
