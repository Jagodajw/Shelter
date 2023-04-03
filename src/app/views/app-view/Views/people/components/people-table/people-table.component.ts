import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PeopleResponse } from 'backend/src/views/PeopleView';
import { Observable } from 'rxjs';

import { PeopleRootService } from '../../people-root.service';
import { mergeMap } from 'rxjs';
@Component({
  selector: 'app-people-table',
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss'],
  animations: [
    trigger('extension', [
      state('collapse', style({ display: 'none' })),
      state('expand', style({ display: 'table-row' })),
      transition('expand <=> collapse', animate('225ms')),
    ]),
  ],
})
export class PeopleTableComponent implements OnInit {
  @Input() set people(newPeople: PeopleResponse[] | null) {
    if (newPeople === null) return;
    this.setPeopleTable = newPeople;
  }
  @Output() addToBlackListEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  public expandedElement!: PeopleResponse | null;
  public peopleTable = new MatTableDataSource<PeopleResponse>([]);
  public readonly status$: Observable<boolean>;
  constructor(
    public readonly router: Router,
    public root: PeopleRootService,
    public dialog: MatDialog
  ) {
    this.status$ = this.root.status$.asObservable();
  }

  public displayedColumns: string[] = [
    'name',
    'city',
    'adress',
    'peselNip',
    'telepohone',
    'commune',
    'black_list',
    'action',
  ];
  ngOnInit(): void {}

  public editPerson(peopleId: number): void {
    this.root.editPeople(peopleId);
  }

  public openPetDetail(petId: string) {
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }

  public addToBlackList(peopleId: number): void {
    this.addToBlackListEmitter.emit(peopleId);
  }

  private set setPeopleTable(name: PeopleResponse[]) {
    this.peopleTable = new MatTableDataSource<PeopleResponse>(name);
    this.peopleTable.filterPredicate = function (
      data,
      filter: string
    ): boolean {
      return (
        `${data.name} ${data.surname}`.toLowerCase().includes(filter) ||
        (Object.keys(data) as (keyof PeopleResponse)[]).some(
          (key: keyof PeopleResponse) =>
            JSON.stringify(data[key]).toLowerCase().includes(filter)
        )
      );
    };
  }

  public getSearchParams(event: any) {
    event = event.trim();
    event = event.toLowerCase();
    this.peopleTable.filter = event;
  }
}
