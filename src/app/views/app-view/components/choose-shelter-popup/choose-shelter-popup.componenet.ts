import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { cardList, Shelter } from './choose-shelter-popup';
@Component({
  selector: 'app-choose-shelter-popup',
  templateUrl: './choose-shelter-popup.component.html',
  styleUrls: ['./choose-shelter-popup.component.scss'],
})
export class ChooseShelterPopupComponenet implements OnInit {
  public cardList = cardList;

  constructor(public dialogRef: MatDialogRef<ChooseShelterPopupComponenet>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  setShelter(typeShelter: Shelter): void { // przekazje inforamcje do serwisu
    this.dialogRef.close(typeShelter);
  }
}
