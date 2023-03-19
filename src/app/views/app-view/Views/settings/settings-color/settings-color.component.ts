import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ColorResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsColorPopupComponent } from './settings-color-popup/settings-color-popup.component';

@Component({
  selector: 'app-settings-color',
  templateUrl: './settings-color.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsColorComponent implements OnInit {
  public colorTable = new MatTableDataSource<ColorResponse>([]);
  public displayedColumns: string[] = ['color', 'action'];
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getColor();
  }

  public addColorPopup(): void {
    this.dialog
      .open(SettingsColorPopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.addColor' },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getColors())
      )
      .subscribe((color: ColorResponse[]) => (this.setColorTable = color));
  }
  public editPosition(color: ColorResponse): void {
    this.dialog
      .open(SettingsColorPopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.editColor', model: color },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getColors())
      )
      .subscribe((color: ColorResponse[]) => (this.setColorTable = color));
  }

  public deletePosition(color: ColorResponse, index: number): void {
    this.root.deleteSpecies(color.ID.toString()).subscribe({
      next: () => {
        this.colorTable.data.splice(index, 1);
        this.setColorTable = this.colorTable.data;
      },
    });
  }

  public getColor(): void {
    this.root.getColors().subscribe((color: ColorResponse[]) => {
      this.setColorTable = color;
    });
  }

  private set setColorTable(color: ColorResponse[]) {
    this.colorTable = new MatTableDataSource<ColorResponse>(color);
  }
}
