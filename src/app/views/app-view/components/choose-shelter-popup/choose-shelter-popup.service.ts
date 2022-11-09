import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChooseShelterPopupComponenet } from './choose-shelter-popup.componenet';

@Injectable()
export class ChooseShelterPopupService {
  constructor(private readonly dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ChooseShelterPopupComponenet, {
      width: '50%',
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }
}
