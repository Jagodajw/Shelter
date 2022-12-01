import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PeopleTableInterface, peopleType } from './people-table-interface';
import { Router } from '@angular/router';
import { DataPersonDonorComponent } from '../../components/data-person-donor/data-person-donor.component';
import { DataPersonActionPopupComponent } from '../../components/data-person-action-popup/data-person-action-popup.component';
import { PetsTableInterface } from '../pets/pets-table-interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [
    trigger('extension', [
      state('collapse', style({ display: 'none' })),
      state('expand', style({ display: 'table-row' })),
      transition('expand <=> collapse', animate('225ms')),
    ]),
  ],
})
export class PeopleComponent implements OnInit {
  public status: boolean = false;
  public peopleType: PeopleTableInterface[] = [];
  public expandedElement!: PetsTableInterface | null;
  public peopleTable = new MatTableDataSource<PeopleTableInterface>(
    this.peopleType
  );

  constructor(
    private _form: FormBuilder,
    public dialog: MatDialog,
    public router: Router
  ) {}
  public displayedColumns: string[] = [
    'name',
    'city',
    'adress',
    'peselNip',
    'telepohone',
    'community',
    'blackList',
    'action',
  ];

  ngOnInit(): void {}
  clickEvent() {
    this.status = !this.status;
  }
  public dataPeople: PeopleTableInterface[] = [
    {
      id: 0,
      name: 'Jagoda',
      surname: 'Wasiak',
      adress: 'Borowa 33',
      city: 'Tychy',
      postCode: 43 - 100,
      community: 'Tychy',
      province: 'Slask',
      ID: 'CDE13123',
      pesel: '002114012123',
      telephone: 605901924,
      email: 'jagodajw@gmail.com',
      description: 'opis elo elo',
      blackList: false,
      typePerson: peopleType.naturalPerson,
      pets: [],
    },
  ];
  public dataSource = this.dataPeople;

  // outPet(): void {
  //   this.dialog.open(PopupOutAnimalComponent, {
  //     panelClass: ['input-70', 'modal-without-padding'],
  //     disableClose: true,
  //   });
  // }
  public viewPerson(): void {
    this.dialog.open(DataPersonActionPopupComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
      disableClose: true,
    });
  }
  public openDialog(): void {
    this.dialog.open(DataPersonDonorComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
      disableClose: true,
    });
  }

  deletePattern() {}

  public openPetDetail(petId: number) {
    console.log(petId);
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }
}
