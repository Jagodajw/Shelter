import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeResponse } from 'backend/src/views/EmployeeView';
import { EmployeeService } from 'src/app/views/app-view/services/api/employee.service';
interface Data {
  title: string;
  model: EmployeeResponse | undefined;
}
@Component({
  selector: 'app-settings-employees-popup',
  templateUrl: './settings-employees-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsEmployeesPopupComponent implements OnInit {
  public employeesForm!: FormGroup;

  constructor(
    private readonly _form: FormBuilder,
    private readonly employeesService: EmployeeService,
    private readonly ref: MatDialogRef<SettingsEmployeesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}
  ngOnInit(): void {
    this.buildForm();
    if (this.data.model !== undefined) {
      this.employeesForm.patchValue(this.data.model);
    }
  }

  private buildForm(): void {
    this.employeesForm = this._form.group({
      name: [],
      surname: [],
    });
  }

  addEmployees(): void {
    if (this.data.model) {
      this.employeesService
        .editEmployee(this.data.model.ID.toString(), {
          name: this.employeesForm?.get('name')?.value,
          surname: this.employeesForm?.get('surname')?.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.employeesService
        .addEmployee({
          name: this.employeesForm?.get('name')?.value,
          surname: this.employeesForm?.get('surname')?.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    }
  }
}
