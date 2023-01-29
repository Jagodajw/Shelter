import { Component, forwardRef, Input, OnInit, Self } from '@angular/core';
import { FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmployeeResponse } from 'backend/src/models/EmployeeModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { EmployeeService } from '../../services/api/employee.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select | EmployeeResponse;
@Component({
  selector: 'app-employees-autocomplete',
  templateUrl: './employees-autocomplete.component.html',
  styleUrls: ['./employees-autocomplete.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => EmployeesAutocompleteComponent),
  //     multi: true,
  //   },
  // ],
})
export class EmployeesAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  @Input() placeholder!: string;
  public employeesList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    @Self() ngControl: NgControl,
    private readonly api: EmployeeService,
    private readonly shelter: ShelterService
  ) {
    super(ngControl);
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (value) this.value = value.ID;
      },
    });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.employeesList$ = this.api.getEmployee().pipe(
            map(
              (employeesResponse: EmployeeResponse[]) =>
                employeesResponse.map((employees: EmployeeResponse) => ({
                  ID: employees.ID,
                  name: `${employees.name} ${employees.surname}`,
                })) as Select[]
            )
          );
        })
      )
      .subscribe();
  }

  protected override handleSetDisabledStateFromOutside(): void {
    if (this.isDisabled) return this.control.disable();
    this.control.enable();
  }

  override handleValueChangeFromOutside(): void {
    const value = this.value as EmployeeResponse;
    if (value) {
      this.control.patchValue({
        ...value,
        name: `${value.name} ${value.surname}`,
      });
    }
  }
}
