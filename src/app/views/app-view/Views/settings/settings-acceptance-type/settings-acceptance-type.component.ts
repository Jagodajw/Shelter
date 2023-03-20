import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TypeAcceptanceResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsAcceptanceTypePopupComponent } from './settings-acceptance-type-popup/settings-acceptance-type-popup.component';

@Component({
  selector: 'app-settings-acceptance-type',
  templateUrl: './settings-acceptance-type.component.html',
})
export class SettingsAcceptanceTypeComponent implements OnInit {
public acceptanceTypeTable = new MatTableDataSource<TypeAcceptanceResponse>([])
public displayedColumns: string[] = ['acceptanceType', 'action'];
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) { }

  ngOnInit(): void {
    this.getAcceptanceType();
  }

  public addAcceptanceTypePopup(): void{
    this.dialog
      .open(SettingsAcceptanceTypePopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.addAcceptanceType' },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getTypeAcceptance())
      )
      .subscribe((acceptanceType: TypeAcceptanceResponse[]) => (this.setAcceptanceTypeTable = acceptanceType));
  }
  public editPosition(acceptanceType: TypeAcceptanceResponse): void {
    this.dialog
      .open(SettingsAcceptanceTypePopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.editAcceptanceType', model: acceptanceType },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getTypeAcceptance())
      )
      .subscribe((acceptanceType: TypeAcceptanceResponse[]) => (this.setAcceptanceTypeTable = acceptanceType));
  }

  public deletePosition(acceptanceType: TypeAcceptanceResponse, index: number): void {
    this.root.deleteSpecies(acceptanceType.ID.toString()).subscribe({
      next: () => {
        this.acceptanceTypeTable.data.splice(index, 1);
        this.setAcceptanceTypeTable = this.acceptanceTypeTable.data;
      },
    });
  }

  public getAcceptanceType(): void {
    this.root.getTypeAcceptance().subscribe((acceptanceType: TypeAcceptanceResponse[]) => {
      this.setAcceptanceTypeTable = acceptanceType;
    });
  }

  private set setAcceptanceTypeTable(acceptanceType: TypeAcceptanceResponse[]) {
    this.acceptanceTypeTable = new MatTableDataSource<TypeAcceptanceResponse>(acceptanceType);
  }
}
