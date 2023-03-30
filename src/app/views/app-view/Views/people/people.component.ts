import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PeopleResponse } from 'backend/src/views/PeopleView';
import { Observable } from 'rxjs';
import { PeopleRootService } from './people-root.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [PeopleRootService],
})
export class PeopleComponent implements OnInit {
  public readonly status$: Observable<boolean>;
  public readonly people$: Observable<PeopleResponse[]>;
  public isLoading$: Observable<boolean>;
  public isBlackList$: Observable<boolean>;
  public search = new FormControl();

  constructor(
    public dialog: MatDialog,
    public router: Router,
    private readonly root: PeopleRootService
  ) {
    this.people$ = this.root.peopleObservable$;
    this.status$ = this.root.status$.asObservable();
    this.isBlackList$ = this.root.isBlackList$.asObservable();
    this.isLoading$ = this.root.isLoading$.asObservable();
  }

  ngOnInit(): void {}

  public togglePeopleView() {
    this.root.status$.next(!this.root.status$.value);
  }

  toggleChangeBlackList() {
    this.root.isBlackList$.next(!this.root.isBlackList$.value);
  }

  public addToBlackList(peopleId: number): void {
    this.root.addPeopleForBlackList(peopleId);
  }
}
