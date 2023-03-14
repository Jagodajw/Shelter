import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeResponse } from 'backend/src/models/EmployeeModel';
import { EmployeeService } from '../../../services/api/employee.service';
import { SettingsEmployeesPopupComponent } from './settings-employees-popup/settings-employees-popup.component';

@Component({
  selector: 'app-settings-employees',
  templateUrl: './settings-employees.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsEmployeesComponent implements OnInit {
  public employeesTable = new MatTableDataSource<EmployeeResponse>([]);
  public displayedColumns: string[] = ['name', 'surname', 'action'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly employeesService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public addEmployeesPopup(): void {
    this.dialog
      .open(SettingsEmployeesPopupComponent, {
        panelClass: ['modal__width--60', 'modal-without-padding'],
      })
      .afterClosed()
      .subscribe((res) => console.log(res));
  }
  public deletePosition(employeesId: string): void {}
  public editPosition(employeesId: string): void {}

  public getEmployees(): void {
    this.employeesService
      .getEmployee()
      .subscribe((employees: EmployeeResponse[]) => {
        this.employeesTable = new MatTableDataSource<EmployeeResponse>(
          employees
        );
      });
  }
}
