import { Component, OnInit, SkipSelf } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { BehaviorSubject } from 'rxjs';
import { genderList, sizeList } from 'src/app/data/data-list';
import { Select } from '../select/select';
import { SpeciesAutocompleteReturnValue } from '../species-autocomplete/species-autocomplete.component';

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
  public speciesId$: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(undefined);
  // private hasBeenSpeciesFirstChanges: boolean = false;

  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    // this.speciesId =
    //   this.formGroupDirective.control
    //     .get('registerAnimal.species')
    //     ?.valueChanges.pipe(
    //       map((species: Select | null | string) => {
    //         console.log(species);
    //         (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
    //           .get('breed')
    //           ?.patchValue('');
    //         return ((species as Select)?.ID || undefined) as number | undefined;
    //       })
    //     ) ?? of(undefined);

    this.speciesId$.next(
      (this.formGroupDirective.control.get('registerAnimal') as FormGroup).get(
        'species'
      )?.value?.ID ?? undefined
    );
  }

  public setSpeciesId(species: SpeciesAutocompleteReturnValue): void {
    (this.formGroupDirective.control.get('registerAnimal') as FormGroup)
      .get('breed')
      ?.patchValue('');
    this.speciesId$.next(
      ((species as Select)?.ID || undefined) as number | undefined
    );
  }

  public vaccination({ checked }: MatCheckboxChange): void {
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
