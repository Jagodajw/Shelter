import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PopupOutAnimalComponent } from '../../Views/pets/components/popup-out-animal/popup-out-animal.component';
import { PetsTableInterface } from '../../Views/pets/pets-table-interface';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss'],
})
export class PetsTableComponent implements OnInit {
  @Input() isVisibiltyHeader: boolean = true;
  private petsType: PetsTableInterface[] = [];
  public petsTable = new MatTableDataSource<PetsTableInterface>(this.petsType);

  constructor(public router: Router, public dialog: MatDialog) {}

  ngOnInit(): void {}

  openPetDetail(petId: number) {
    console.log(petId);
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }
  outPet(): void {
    this.dialog.open(PopupOutAnimalComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
      disableClose: true,
    });
  }
  public displayedColumns: string[] = [
    'name',
    'species',
    'breed',
    'gender',
    'community',
    'area',
    'ID',
    'Nr-chip',
    // 'handOverTheAnimal',
    'action',
  ];
  public dataPets: PetsTableInterface[] = [
    {
      id: 0,
      name: 'RIKI',
      species: 'Pies',
      breed: ' dachowiec',
      community: 'Tychy',
      area: 'tychy',
      gender: ' suczka',
      numberChip: 13123,
      identificator: 'P/1',
    },
  ];
  dataSource = this.dataPets;
  deletePeople() {}
}
