import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { mergeMap, Observable } from 'rxjs';
import { ApiService } from 'src/api/services';
import { ShelterService } from '../../services/shelter.service';
import { PopupOutAnimalComponent } from '../../Views/pets/components/popup-out-animal/popup-out-animal.component';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss'],
})
export class PetsTableComponent implements OnInit {
  @Input() public isVisibiltyHeader: boolean = true;
  public petsTable = new MatTableDataSource<any[]>();
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

  constructor(
    public readonly router: Router,
    public readonly dialog: MatDialog,
    private readonly api: ApiService,
    private readonly shelter: ShelterService
  ) {}

  ngOnInit(): void {
    this.shelterChangeDetector();
  }

  private shelterChangeDetector(): void {
    // have to unsubscribe, mayby @UntilDestory
    this.shelter.selectedShelterChangeDetector$
      .pipe(mergeMap(() => this.getAnimalsTableList()))
      .subscribe(
        (petsData) => (this.petsTable = new MatTableDataSource<any[]>(petsData))
      );
  }

  private getAnimalsTableList(): Observable<any> {
    return this.api.getAnimals();
  }

  public openPetDetail(petId: number) {
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }

  public outPet(): void {
    this.dialog.open(PopupOutAnimalComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
      disableClose: true,
    });
  }

  public deletePeople(): void {}
}
