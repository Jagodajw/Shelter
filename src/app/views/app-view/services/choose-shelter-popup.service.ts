import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiService } from 'src/api/services';
import { StorageService } from 'src/app/services/storage.service';
import { Shelters } from '../components/choose-shelter-popup/choose-shelter-popup';
import { ChooseShelterPopupComponenet } from '../components/choose-shelter-popup/choose-shelter-popup.componenet';
@Injectable()
export class ChooseShelterPopupService {
  public shelter: BehaviorSubject<Shelters | null> =
    new BehaviorSubject<Shelters | null>(null);

  constructor(
    private readonly dialog: MatDialog,
    private storage: StorageService,
    private readonly api: ApiService
  ) {
    const shelter: Shelters = this.storage.get('shelter') as Shelters;
    this.shelter.next(shelter ?? null);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChooseShelterPopupComponenet, {
      panelClass: 'shelter-choose-popup',
      data: { shelterList$: this.getShelterList$() },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.shelter.next(res);
      this.storage.set('shelter', res);
    });
  }

  private getShelterList$(): Observable<Shelters[]> {
    return this.api.getShelters() as unknown as Observable<Shelters[]>;
  }
}
