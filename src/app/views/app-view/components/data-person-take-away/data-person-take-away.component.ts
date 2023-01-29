import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SkipSelf,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { ButtonFilter } from '../button-filter/button-filter';
type PersonType = 'private' | 'legal' | 'none';
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
  public personType: PersonType = 'private';
  public blockInput: boolean = false;
  @Output() personTypeEmit: EventEmitter<PersonType> =
    new EventEmitter<PersonType>();
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

  public filtersPeople: ButtonFilter<PersonType>[] = [
    { id: 'private', name: 'typePerson.private' },
    { id: 'legal', name: 'typePerson.legal' },
    { id: 'none', name: 'typePerson.none' },
  ];

  onChangeSelect(event: PersonType): void {
    this.personTypeEmit.emit(event);
    this.personType = event;
    if (this.personType === 'legal') {
      this.blockInput = true;
    } else {
      this.blockInput = false;
    }
  }
}
