import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BreedListResponse, BreedResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsBreedPopupComponent } from './settings-breed-popup/settings-breed-popup.component';

@Component({
  selector: 'app-settings-breed',
  templateUrl: './settings-breed.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsBreedComponent implements OnInit {
  public breedTable = new MatTableDataSource<BreedListResponse>([]);
  public displayedColumns: string[] = ['species_id', 'breed', 'action'];
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getBreed();
  }

  public addBreedPopup(): void {
    this.dialog
      .open(SettingsBreedPopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.addBreed' },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getBreed())
      )
      .subscribe((breed: BreedListResponse[]) => (this.setBreedTable = breed));
  }
  public editPosition(breed: BreedListResponse): void {
    this.dialog
      .open(SettingsBreedPopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
        data: { title: 'settings.editBreed', model: breed },
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getBreed())
      )
      .subscribe((breed: BreedListResponse[]) => (this.setBreedTable = breed));
  }

  public deletePosition(breed: BreedResponse, index: number): void {
    this.root.deleteBreed(breed.ID.toString()).subscribe({
      next: () => {
        this.breedTable.data.splice(index, 1);
        this.setBreedTable = this.breedTable.data;
      },
    });
  }

  public getBreed(): void {
    this.root.getBreed().subscribe((breed: BreedListResponse[]) => {
      this.setBreedTable = breed;
    });
  }

  private set setBreedTable(breed: BreedListResponse[]) {
    this.breedTable = new MatTableDataSource<BreedListResponse>(breed);
  }
}
