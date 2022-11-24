import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ButtonFilter } from '../../components/button-filter/button-filter';
import { Select } from '../../components/select/select';
import { PopupOutAnimalComponent } from './components/popup-out-animal/popup-out-animal.component';
import { PopupRegisterComponent } from './components/popup-register/popup-register.component';
import { PetsTableInterface } from './pets-table-interface';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss'],
})
export class PetsComponent implements OnInit {
  private petsType: PetsTableInterface[] = [];
  public petsTable = new MatTableDataSource<PetsTableInterface>(this.petsType);
  status: boolean = false;

  constructor(
    private _form: FormBuilder,
    public dialog: MatDialog,
    public router: Router
  ) {}

  public displayedColumns: string[] = [
    'name',
    'species',
    'breed',
    'gender',
    'community',
    'area',
    'ID',
    'Nr-chip',
    'handOverTheAnimal',
  ];

  public filtersPets: ButtonFilter[] = [
    { id: 0, name: 'pets.current' },
    { id: 1, name: 'pets.past' },
  ];
  public arrayOfSpecies: Select[] = [
    { id: 0, name: 'kot' },
    { id: 1, name: 'pies' },
  ];
  public filtersAddPets: Select[] = [
    { id: 0, name: 'pets.filterNoCastrated' },
    { id: 1, name: 'pets.filterCastrated' },
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

  toppings = this._form.group({
    cuarantine: false,
    unvaccinated: false,
  });

  ngOnInit(): void {}

  add(event: number) {
    console.log(event);
  }
  chooseSelect(event: Select) {
    console.log(event);
  }
  chooseAutocomplete(event: Select) {
    console.log(event);
  }
  clickEvent() {
    this.status = !this.status;
  }

  outPet(): void {
    this.dialog.open(PopupOutAnimalComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
    });
  }

  openDialog(): void {
    this.dialog.open(PopupRegisterComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
    });
  }

  openPetDetail(petId: number) {
    console.log(petId);
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }
}
