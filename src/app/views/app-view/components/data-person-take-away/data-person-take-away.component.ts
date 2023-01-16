import { Component, OnInit, SkipSelf } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { ButtonFilter } from '../button-filter/button-filter';
import { Select } from '../select/select';

@Component({
  selector: 'app-data-person-take-away',
  templateUrl: './data-person-take-away.component.html',
  styleUrls: ['./data-person-take-away.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class DataPersonTakeAwayComponent implements OnInit {
  public personType: number = 0;
  public blockInput: boolean = false;
  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    (this.formGroupDirective.control.get('dataPersonTakeAway') as FormGroup)
      .get('city')
      ?.valueChanges.subscribe((city) => {
        (this.formGroupDirective.control.get('dataPersonTakeAway') as FormGroup)
          .get('zip_code')
          ?.patchValue(city.zip_code);
      });
  }
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];

  public filtersPeople: ButtonFilter[] = [
    { id: 0, name: 'Osoba fizyczna' },
    { id: 1, name: 'Osoba prawna' },
    { id: 2, name: 'znaleziony' },
  ];

  onChangeSelect(event: number): void {
    this.personType = event;
    if (this.personType === 1) {
      this.blockInput = true;
    } else {
      this.blockInput = false;
    }
  }
}
