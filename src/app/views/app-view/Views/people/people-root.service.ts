import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PeopleResponse, PeopleStatus } from 'backend/src/views/PeopleView';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  mergeMap,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { PeopleService } from '../../services/api/people.service';
import { ShelterService } from '../../services/shelter.service';
import {
  DataPersonActionPopupComponent,
  DataPersonPopupData,
} from '../../components/data-person-action-popup/data-person-action-popup.component';

interface ChangesParams {
  status: PeopleStatus;
  isBlackList: boolean;
}

@UntilDestroy()
@Injectable()
export class PeopleRootService {
  private readonly people$: BehaviorSubject<PeopleResponse[]> =
    new BehaviorSubject<PeopleResponse[]>([]);
  public status$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isBlackList$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );
  constructor(
    private dialog: MatDialog,
    private readonly api: PeopleService,
    private readonly shelter: ShelterService
  ) {
    this.changeDetector();
  }

  private changeDetector(): void {
    combineLatest(
      this.status$,
      this.isBlackList$,
      this.shelter.selectedShelterChangeDetector$
    )
      .pipe(
        tap(() => {
          this.isLoading$.next(true);
        }),
        map(
          ([status, isBlackList]) =>
            ({
              status: this.getPeopleStatus(status),
              isBlackList,
            } as ChangesParams)
        ),
        mergeMap(({ status, isBlackList }: ChangesParams) => {
          return this.api.getPeople(status, isBlackList);
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (peopleData: PeopleResponse[]) => {
          this.people$.next(peopleData);
          this.isLoading$.next(false);
        },
        error: () => this.isLoading$.next(false),
      });
  }

  public get peopleObservable$(): Observable<PeopleResponse[]> {
    return this.people$.asObservable();
  }

  public addPeopleForBlackList(peopleId: number): void {
    const people = this.people$.value.find((people) => people.ID === peopleId);
    if (people?.ID === undefined) return;

    this.api
      .getToggleBlackListState(people.ID, !this.isBlackList$.value)
      .pipe(mergeMap(() => this.refreschGet(this.isBlackList$.value)))
      .subscribe();
  }

  private refreschGet(blackList: boolean): Observable<PeopleResponse[]> {
    this.isLoading$.next(true);
    return this.api
      .getPeople(this.getPeopleStatus(this.status$.value), blackList)
      .pipe(
        tap((peopleData: PeopleResponse[]) => {
          this.people$.next(peopleData);
          this.isLoading$.next(false);
        }),
        catchError((err) => {
          this.isLoading$.next(false);
          return throwError(err);
        })
      );
  }

  private getPeopleStatus(status: boolean): PeopleStatus {
    return status ? 'receiving' : 'moving';
  }

  public editPeople(peopleId: number): void {
    const data: DataPersonPopupData = {
      status$: this.status$,
      peopleId,
    };
    this.dialog
      .open(DataPersonActionPopupComponent, {
        panelClass: ['input-70', 'modal-without-padding'],
        disableClose: true,
        data,
      })
      .afterClosed()
      .pipe(
        filter(
          (data: { fetchData: boolean } | undefined) =>
            data?.fetchData !== undefined
        ),
        mergeMap(() => this.refreschGet(this.isBlackList$.value))
      )
      .subscribe();
  }
}
