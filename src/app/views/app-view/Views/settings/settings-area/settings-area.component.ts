import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AreaResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsAreaPopupComponent } from './settings-area-popup/settings-area-popup.component';

@Component({
  selector: 'app-settings-area',
  templateUrl: './settings-area.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsAreaComponent implements OnInit {
  public areaTable = new MatTableDataSource<AreaResponse>([]);
  public displayedColumns: string[] = ['area', 'action']; 
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) { }

  ngOnInit(): void {
    this.getArea();
  }

  public addAreaPopup(): void{
    this.dialog.open(SettingsAreaPopupComponent,{
      panelClass: ['modal__width--50', 'modal-without-padding'],
      data: { title: 'settings.addArea' },
    }
      ).afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getArea())
      )
      .subscribe((area: AreaResponse[]) => (this.setAreaTable = area));
  }

  public editPosition(area: AreaResponse): void {
    this.dialog
      .open(SettingsAreaPopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.editArea', model: area },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getArea())
      )
      .subscribe((area: AreaResponse[]) => (this.setAreaTable = area));
  }

  public deletePosition(area: AreaResponse, index: number): void {
    this.root.deleteArea(area.ID.toString()).subscribe({
      next: () => {
        this.areaTable.data.splice(index, 1);
        this.setAreaTable = this.areaTable.data;
      },
    });
  }

  public getArea(): void {
    this.root.getArea().subscribe((area: AreaResponse[]) => {
      this.setAreaTable = area;
    });
  }

  private set setAreaTable(area: AreaResponse[]) {
    this.areaTable = new MatTableDataSource<AreaResponse>(area);
  }
}

