import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColorResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';
interface Data {
  title: string;
  model: ColorResponse | undefined;
}
@Component({
  selector: 'app-settings-color-popup',
  templateUrl: './settings-color-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsColorPopupComponent implements OnInit {
  public colorControl: FormControl = new FormControl();

  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsColorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {
    if (this.data.model !== undefined)
      this.colorControl.patchValue(this.data.model.color);
  }

  addColor(): void {
    if (this.data.model) {
      this.root
        .editColor(this.data.model.ID.toString(), {
          color: this.colorControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root.addColor({ color: this.colorControl.value }).subscribe({
        next: () => this.ref.close({ fetchData: true }),
      });
    }
  }
}
