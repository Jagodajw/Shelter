import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/api/services';
import { PopupOutAnimalComponent } from '../../Views/pets/components/popup-out-animal/popup-out-animal.component';


@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss'],
})
export class PetsTableComponent implements OnInit {
  @Input() isVisibiltyHeader: boolean = true;
  // private petsType: PetsTableInterface[] = [];
  public petsTable = new MatTableDataSource<any[]>();
  public readonly dataAnimalsTable?: Observable<any[]>;

  constructor(
    public router: Router,
    public dialog: MatDialog,
    private readonly api: ApiService
  ) {
    this.dataAnimalsTable = this.getAnimalsTableList();
  }

  ngOnInit(): void {
    this.getAnimalsTableList().subscribe(
      (petsData) => (this.petsTable = new MatTableDataSource<any[]>(petsData))
    );
  }

  openPetDetail(petId: number) {
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


  dataSource = this.dataAnimalsTable;

  private getAnimalsTableList(): Observable<any> {
    return this.api.getAnimals();
  }
  deletePeople() {}
}
