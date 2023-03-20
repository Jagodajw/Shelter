import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommuneResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';
interface Data {
  title: string;
  model: CommuneResponse | undefined;
}
@Component({
  selector: 'app-settings-commune-popup',
  templateUrl: './settings-commune-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsCommunePopupComponent implements OnInit {
public communeControl: FormControl = new FormControl();
  constructor(
    private readonly root: DictionaryService,
    private ref: MatDialogRef<SettingsCommunePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  ngOnInit(): void {
    if (this.data.model !== undefined)
    this.communeControl.patchValue(this.data.model.commune)
  }

  addCommune(): void {
    if (this.data.model) {
      this.root
        .editCommune(this.data.model.ID.toString(), {
          commune: this.communeControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root.addCommune({ commune: this.communeControl.value }).subscribe({
        next: () => this.ref.close({ fetchData: true }),
      });
    }
  }
}
