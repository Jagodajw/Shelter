import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-employees-popup',
  templateUrl: './settings-employees-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsEmployeesPopupComponent implements OnInit {
  public employeesForm!: FormGroup;

  constructor(private readonly _form: FormBuilder) {}
  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.employeesForm = this._form.group({
      name: [],
      surname: [],
    });
  }

  addEmployees(): void {}
}
