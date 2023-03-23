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
import { DataPersonActionPopupComponent } from 'src/app/views/app-view/components/data-person-action-popup/data-person-action-popup.component';
import { PeopleRootService } from '../../people-root.service';

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
    this.peopleTable = new MatTableDataSource<PeopleResponse>(newPeople);
  }
  @Output() deletePositionEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  public expandedElement!: PeopleResponse | null;
  public peopleTable = new MatTableDataSource<PeopleResponse>([]);
  constructor(
    public readonly router: Router,
    public root: PeopleRootService,
    public dialog: MatDialog
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

  public viewPerson(): void {
    this.dialog.open(DataPersonActionPopupComponent, {
      panelClass: ['input-70', 'modal-without-padding'],
      disableClose: true,
    });
  }

  public openPetDetail(petId: string) {
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }

  public deletePosition(petId: string): void {
    this.deletePositionEmitter.emit(petId);
  }
}
