import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SpeciesResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsSpeciesPopupComponent } from './settings-species-popup/settings-species-popup.component';
@Component({
  selector: 'app-settings-species',
  templateUrl: './settings-species.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],
})
export class SettingsSpeciesComponent implements OnInit {
  public speciesTable = new MatTableDataSource<SpeciesResponse>([]);
  public displayedColumns: string[] = ['species', 'action'];

  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) {}

  ngOnInit(): void {
    this.getSpecies();
  }

  public addSpeciesPopup(): void {
    this.dialog
      .open(SettingsSpeciesPopupComponent, {
        panelClass: ['modal__width--50', 'modal-without-padding'],
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.root.getSpecies())
      )
      .subscribe(
        (species: SpeciesResponse[]) => (this.setSpeciesTable = species)
      );
  }
  public deletePosition(speciesId: string): void {}
  public editPosition(speciesId: string): void {}

  public getSpecies(): void {
    this.root.getSpecies().subscribe((species: SpeciesResponse[]) => {
      this.setSpeciesTable = species;
    });
  }

  private set setSpeciesTable(species: SpeciesResponse[]) {
    this.speciesTable = new MatTableDataSource<SpeciesResponse>(species);
  }
}
