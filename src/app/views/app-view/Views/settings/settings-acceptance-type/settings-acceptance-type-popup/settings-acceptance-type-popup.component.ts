import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeAcceptanceResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';
interface Data {
  title: string;
  model: TypeAcceptanceResponse | undefined;
}

@Component({
  selector: 'app-settings-acceptance-type-popup',
  templateUrl: './settings-acceptance-type-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsAcceptanceTypePopupComponent implements OnInit {
  public acceptanceTypeControl: FormControl = new FormControl();
  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsAcceptanceTypePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {
    if (this.data.model !== undefined)
      this.acceptanceTypeControl.patchValue(this.data.model.type_acceptance);
  }

  addAcceptanceType(): void {
    if (this.data.model) {
      this.root
        .editTypeAcceptance(this.data.model.ID.toString(), {
          type_acceptance: this.acceptanceTypeControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root
        .addTypeAcceptance({
          type_acceptance: this.acceptanceTypeControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    }
  }
}
