import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BrowserStorageService } from 'src/app/storage.service';
import { Shelter } from '../components/choose-shelter-popup/choose-shelter-popup';
import { ChooseShelterPopupComponenet } from '../components/choose-shelter-popup/choose-shelter-popup.componenet';
@Injectable()
export class ChooseShelterPopupService {
  public typeSchelterInfo: BehaviorSubject<Shelter> =
    new BehaviorSubject<Shelter>(Shelter.tychy);

  constructor(
    private readonly dialog: MatDialog,
    private storage: BrowserStorageService
  ) {
    const shelter: Shelter | null = this.storage.get('shelter') as Shelter;
    this.typeSchelterInfo.next(shelter ?? Shelter.tychy);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ChooseShelterPopupComponenet, {
      panelClass: 'shelter-choose-popup',
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.typeSchelterInfo.next(res);
      this.storage.set('shelter', res);
    });
  }
}
