import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { SheltersResponse } from 'src/api/models';
import { ShelterService as ShelterHttpService } from 'src/api/services';
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
    private readonly api: ShelterHttpService
  ) {
    const shelter: Shelters = this.storage.get('shelter') as Shelters;
    this.selectedShelter$.next(shelter ?? null);
  }

  public init(): void {
    if (!this.storage.get('shelter')) {
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

  private getShelterList$(): Observable<SheltersResponse> {
    return this.api.getShelters();
  }

  public get selectedShelterChangeDetector$(): Observable<Shelters> {
    return this.getSelectedShelter$.pipe(
      filter((shelter: Nullable<Shelters>) => shelter !== null),
      map((shelter: Nullable<Shelters>) => shelter as Shelters)
    );
  }

  public get getSelectedShelter$(): Observable<Nullable<Shelters>> {
    return this.selectedShelter$.asObservable();
  }
}
