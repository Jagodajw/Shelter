import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Shelters } from './choose-shelter-popup';

interface Data {
  shelterList$: Observable<Shelters[]>;
}

@Component({
  selector: 'app-choose-shelter-popup',
  templateUrl: './choose-shelter-popup.component.html',
  styleUrls: ['./choose-shelter-popup.component.scss'],
})
export class ChooseShelterPopupComponenet implements OnInit {
  public readonly defaultShelterImg: string =
    'https://otoz.pl/wp-content/themes/otoz/images/otoz-animals.png';
  constructor(
    public dialogRef: MatDialogRef<ChooseShelterPopupComponenet>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  setShelter(shelter: Shelters): void {
    // przekazje inforamcje do serwisu
    this.dialogRef.close(shelter);
  }
}
