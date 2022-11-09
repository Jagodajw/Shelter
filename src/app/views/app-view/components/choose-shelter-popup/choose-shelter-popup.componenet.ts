import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-choose-shelter-popup',
  templateUrl: './choose-shelter-popup.component.html',
  styleUrls: ['./choose-shelter-popup.component.scss'],
})
export class ChooseShelterPopupComponenet implements OnInit {
  constructor(public dialogRef: MatDialogRef<ChooseShelterPopupComponenet>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
