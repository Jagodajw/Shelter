import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CityResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsCityPopupComponent } from './settings-city-popup/settings-city-popup.component';

@Component({
  selector: 'app-settings-city',
  templateUrl: './settings-city.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsCityComponent implements OnInit {
  public cityTable = new MatTableDataSource<CityResponse>([]);
  public displayedColumns: string[] = ['city', 'zip_code', 'action'];
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getCity();
  }

  private getCity(): void {
    this.root.getCity().subscribe((city: CityResponse[]) => {
      this.setCityTable = city;
    });
  }
  public addCityPopup(): void {
    this.dialog
      .open(SettingsCityPopupComponent, {
        panelClass: ['modal__width--60', 'modal-without-padding'],
        data: { title: 'settings.addCity' },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getCity())
      )
      .subscribe((city: CityResponse[]) => (this.setCityTable = city));
  }

  public editPosition(city: CityResponse): void {
    this.dialog
      .open(SettingsCityPopupComponent, {
        panelClass: ['modal__width--60', 'modal-without-padding'],
        data: { title: 'settings.editCity', model: city },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getCity())
      )
      .subscribe((city: CityResponse[]) => (this.setCityTable = city));
  }

  public deletePosition(city: CityResponse, index: number): void {
    this.root.deleteCity(city.ID.toString()).subscribe({
      next: () => {
        this.cityTable.data.splice(index, 1);
        this.setCityTable = this.cityTable.data;
      },
    });
  }

  private set setCityTable(city: CityResponse[]) {
    this.cityTable = new MatTableDataSource<CityResponse>(city);
  }
}
