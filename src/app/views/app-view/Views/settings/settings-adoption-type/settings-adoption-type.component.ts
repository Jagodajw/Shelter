import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TypeAdoptionResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsAdoptionTypePopupComponent } from './settings-adoption-type-popup/settings-adoption-type-popup.component';

@Component({
  selector: 'app-settings-adoption-type',
  templateUrl: './settings-adoption-type.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsAdoptionTypeComponent implements OnInit {
  public adoptionTypeTable = new MatTableDataSource<TypeAdoptionResponse>([]);
  public displayedColumns: string[] = ['adoptionType', 'action'];
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getAdoption();
  }

  public addAdoptionTypePopup(): void {
    this.dialog
      .open(SettingsAdoptionTypePopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.addAdoptionType' },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getTypeAdoptation())
      )
      .subscribe(
        (typeAdoption: TypeAdoptionResponse[]) =>
          (this.setTypeAdoptionTable = typeAdoption)
      );
  }

  public editPosition(typeAdoption: TypeAdoptionResponse): void {
    this.dialog
      .open(SettingsAdoptionTypePopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.editTypeAdoption', model: typeAdoption },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getTypeAdoptation())
      )
      .subscribe(
        (typeAdoption: TypeAdoptionResponse[]) =>
          (this.setTypeAdoptionTable = typeAdoption)
      );
  }

  public deletePosition(
    typeAdoption: TypeAdoptionResponse,
    index: number
  ): void {
    this.root.deleteTypeAdoptation(typeAdoption.ID.toString()).subscribe({
      next: () => {
        this.adoptionTypeTable.data.splice(index, 1);
        this.setTypeAdoptionTable = this.adoptionTypeTable.data;
      },
    });
  }

  public getAdoption(): void {
    this.root
      .getTypeAdoptation()
      .subscribe((typeAdoption: TypeAdoptionResponse[]) => {
        this.setTypeAdoptionTable = typeAdoption;
      });
  }

  private set setTypeAdoptionTable(typeAdoption: TypeAdoptionResponse[]) {
    this.adoptionTypeTable = new MatTableDataSource<TypeAdoptionResponse>(
      typeAdoption
    );
  }
}
