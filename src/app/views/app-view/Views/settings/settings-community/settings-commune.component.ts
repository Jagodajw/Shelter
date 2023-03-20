import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CommuneResponse } from 'backend/src/views/DictionaryView';
import { filter, mergeMap } from 'rxjs';
import { DictionaryService } from '../../../services/api/dictionary.service';
import { SettingsCommunePopupComponent } from './settings-commune-popup/settings-commune-popup.component';

@Component({
  selector: 'app-settings-commune',
  templateUrl: './settings-commune.component.html',
  styleUrls: ['../../../../../shared/style/parameters.comoponent.scss'],

})
export class SettingsCommuneComponent implements OnInit {
  public communeTable = new MatTableDataSource<CommuneResponse>([]);
  public displayedColumns: string[] = ['commune', 'action'];
  constructor(
    private readonly dialog: MatDialog,
    private readonly root: DictionaryService
  ) { }

  ngOnInit(): void {
    this.getCommune();
  }

  public addCommunePopup(): void{
    this.dialog.open(SettingsCommunePopupComponent, {
      panelClass: ['modal__width--50', 'modal-without-padding'],
      data: { title: 'settings.addCommune' },
    }).afterClosed().pipe(
      filter((data: {fetchData: boolean} | undefined) => data?.fetchData !== undefined),
      mergeMap(()=> this.root.getCommune())
    ).subscribe((commune: CommuneResponse[]) => (this.setCommuneTable = commune))
  }

  public editPosition(commune: CommuneResponse): void{
    this.dialog.open(SettingsCommunePopupComponent,   {panelClass: ['modal__width--50', 'modal-without-padding'],
    data: { title: 'settings.editCommune', model: commune },}).afterClosed().pipe(
      filter((data: {fetchData: boolean} | undefined) => data?.fetchData !== undefined),
      mergeMap(()=> this.root.getCommune())
    ).subscribe((commune: CommuneResponse[]) => (this.setCommuneTable = commune))
  }

  public deletePosition(commune: CommuneResponse, index: number): void{
    this.root.deleteCommune(commune.ID.toString()).subscribe({
      next: () => {
        this.communeTable.data.splice(index,1);
        this.setCommuneTable = this.communeTable.data
      },
    })
  }

  public getCommune(): void{
    this.root.getCommune().subscribe((commune:CommuneResponse[]) =>{
      this.setCommuneTable = commune;
    });
  }

  private set setCommuneTable(commune: CommuneResponse[]){
    this.communeTable = new MatTableDataSource<CommuneResponse>(commune);
  }
}
