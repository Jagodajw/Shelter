import {
  Component,
  EventEmitter,
  Input,
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
  selector: 'app-data-person-donor',
  templateUrl: './data-person-donor.component.html',
  styleUrls: ['./data-person-donor.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class DataPersonDonorComponent implements OnInit {
  @Input() public isEditMode: boolean = false;
  @Output() personTypeEmit: EventEmitter<PersonType> =
    new EventEmitter<PersonType>();
  public personType: PersonType = 'private';
  public blockInput: boolean = false;
  public personType$?: Observable<PersonType> = of('private');
  constructor(private readonly formGroupDirective: FormGroupDirective) {}

  ngOnInit(): void {
    // this.personTypeEmit.emit(this.personType);
    (this.formGroupDirective.control.get('registerPeople') as FormGroup)
      .get('city')
      ?.valueChanges.subscribe((city) => {
        (this.formGroupDirective.control.get('registerPeople') as FormGroup)
          .get('zip_code')
          ?.patchValue(city.zip_code);
      });

    this.personType$ = this.getPersonType$;
  }

  private get getPersonType$(): Observable<PersonType> | undefined {
    const typeOfPersonControl = (
      this.formGroupDirective.control.get('registerPeople') as FormGroup
    ).get('type_of_person');

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

  public onChangeSelect(event: PersonType): void {
    // this.personTypeEmit.emit(event);
    // this.personType = event;
    // if (this.personType === 'legal') {
    //   this.blockInput = true;
    // } else {
    //   this.blockInput = false;
    // }
  }
}
