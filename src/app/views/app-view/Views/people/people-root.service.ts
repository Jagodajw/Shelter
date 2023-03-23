import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PeopleResponse, PeopleStatus } from 'backend/src/views/PeopleView';
import {
  BehaviorSubject,
  combineLatest,
  map,
  mergeMap,
  Observable,
  tap,
} from 'rxjs';
import { PeopleService } from '../../services/api/people.service';
import { ShelterService } from '../../services/shelter.service';

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
    // private dialog: MatDialog,
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
              status: status ? 'moving' : 'receiving',
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
}
