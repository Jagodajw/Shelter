import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { EmployeeResponse } from 'backend/src/models/EmployeeModel';
import { map, Observable, tap } from 'rxjs';
import { ControlValueAccessorsAbstract } from 'src/app/shared/control-value-accesors.abstract';
import { EmployeeService } from '../../services/api/employee.service';
import { ShelterService } from '../../services/shelter.service';
import { Select } from '../select/select';

type ReturnValue = string | null | Select;
@Component({
  selector: 'app-employees-autocomplete',
  templateUrl: './employees-autocomplete.component.html',
  styleUrls: ['./employees-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeesAutocompleteComponent),
      multi: true,
    },
  ],
})
export class EmployeesAutocompleteComponent
  extends ControlValueAccessorsAbstract<ReturnValue>
  implements OnInit
{
  @Input() placeholder!: string;
  public employeesList$!: Observable<Select[]>;
  public readonly control: FormControl = new FormControl();
  constructor(
    private readonly api: EmployeeService,
    private readonly shelter: ShelterService
  ) {
    super();
  }

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.control.valueChanges.subscribe({
      next: (value) => {
        if (this.onChange) this.onChange(value);
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
                  id: employees.ID,
                  name: `${employees.name} ${employees.surname}`,
                })) as Select[]
            )
          );
        })
      )
      .subscribe();
  }

  public writeValue(value: unknown): void {
    this.control.patchValue(value);
  }
  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) return this.control.disable();
    this.control.enable();
  }
}
