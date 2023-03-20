import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeResponse } from 'backend/src/views/EmployeeView';
import { filter, mergeMap } from 'rxjs';

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
        data: { title: 'settings.addEmployees' },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.employeesService.getEmployee())
      )
      .subscribe(
        (employees: EmployeeResponse[]) => (this.setEmployeesTable = employees)
      );
  }

  public editPosition(employee: EmployeeResponse): void {
    this.dialog
      .open(SettingsEmployeesPopupComponent, {
        panelClass: ['modal__width--60', 'modal-without-padding'],
        data: { title: 'settings.editEmployees', model: employee },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.employeesService.getEmployee())
      )
      .subscribe(
        (employees: EmployeeResponse[]) => (this.setEmployeesTable = employees)
      );
  }

  public deletePosition(employee: EmployeeResponse, index: number): void {
    this.employeesService.deleteEmployee(employee.ID.toString()).subscribe({
      next: () => {
        this.employeesTable.data.splice(index, 1);
        this.setEmployeesTable = this.employeesTable.data;
      },
    });
  }

  public getEmployees(): void {
    this.employeesService
      .getEmployee()
      .subscribe((employees: EmployeeResponse[]) => {
        this.setEmployeesTable = employees;
      });
  }

  private set setEmployeesTable(employees: EmployeeResponse[]) {
    this.employeesTable = new MatTableDataSource<EmployeeResponse>(employees);
  }
}
