import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShelterResponse } from 'backend/src/models/ShelterModel';
import { distinctUntilChanged, filter, map, Observable, share } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ShelterApiService } from 'src/app/services/shelter-api.service';
import { StorageService } from 'src/app/services/storage.service';
import { Shelters } from '../components/choose-shelter-popup/choose-shelter-popup';
import { ChooseShelterPopupComponenet } from '../components/choose-shelter-popup/choose-shelter-popup.componenet';
@Injectable()
export class ShelterService {
  private readonly selectedShelter$: BehaviorSubject<Shelters | null> =
    new BehaviorSubject<Shelters | null>(null);

  constructor(
    private readonly dialog: MatDialog,
    private readonly storage: StorageService,
    private readonly api: ShelterApiService
  ) {
    const shelter: Shelters = this.storage.get('shelter') as Shelters;
    console.log(shelter);
    this.selectedShelter$.next(shelter ?? null);
  }

  public init(): void {
    if (!this.storage.get('shelter')) {
      this.selectedShelter$.next(null);
      this.openDialog();
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ChooseShelterPopupComponenet, {
      panelClass: 'shelter-choose-popup',
      data: { shelterList$: this.getShelterList$() },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.storage.set('shelter', res);
      this.selectedShelter$.next(res);
    });
  }

  private getShelterList$(): Observable<ShelterResponse[]> {
    return this.api.getShelters();
  }

  public get selectedShelterChangeDetector$(): Observable<Shelters> {
    return this.getSelectedShelter$.pipe(
      filter((shelter: Nullable<Shelters>) => shelter !== null),
      map((shelter: Nullable<Shelters>) => shelter as Shelters)
    );
  }

  public get getSelectedShelter$(): Observable<Nullable<Shelters>> {
    return this.selectedShelter$.asObservable().pipe(
      distinctUntilChanged((prev, curr) => prev?.ID === curr?.ID),
      share()
    );
  }
}
