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
import { Observable, map, of, startWith, tap } from 'rxjs';
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
  public blockInput: boolean = false;
  public personType$?: Observable<PersonType> = of('private');
  private primaryGroup!: FormGroup;

  @Output() personTypeEmit: EventEmitter<PersonType> =
    new EventEmitter<PersonType>();
  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    this.primaryGroup = this.formGroupDirective.control.get(
      'dataPersonTakeAway'
    ) as FormGroup;

    this.primaryGroup.get('city')?.valueChanges.subscribe((city) => {
      this.primaryGroup.get('zip_code')?.patchValue(city.zip_code);
    });

    this.personType$ = this.getPersonType$;
  }

  private get getPersonType$(): Observable<PersonType> | undefined {
    const typeOfPersonControl = this.primaryGroup.get('type_of_person');

    return typeOfPersonControl?.valueChanges.pipe(
      startWith(typeOfPersonControl.value),
      tap(
        (personType: PersonType) => (this.blockInput = personType === 'legal')
      ),
      map((data) => data as PersonType)
    );
  }

  public filtersPeople: ButtonFilter<PersonType>[] = [
    { id: 'private', name: 'typePerson.private' },
    { id: 'legal', name: 'typePerson.legal' },
    { id: 'none', name: 'typePerson.none' },
  ];

  onChangeSelect(event: PersonType): void {
    // this.personTypeEmit.emit(event);
    // this.personType = event;
    // if (this.personType === 'legal') {
    //   this.blockInput = true;
    // } else {
    //   this.blockInput = false;
    // }
  }
}
