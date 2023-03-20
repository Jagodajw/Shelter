import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';

interface Data {
  title: string;
  model: AreaResponse | undefined;
}
@Component({
  selector: 'app-settings-area-popup',
  templateUrl: './settings-area-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsAreaPopupComponent implements OnInit {
  public areaControl: FormControl = new FormControl()

  constructor(  private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsAreaPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }

  ngOnInit(): void {
    if (this.data.model !== undefined)
      this.areaControl.patchValue(this.data.model.area);
  }

  addArea(): void {
    if (this.data.model) {
      this.root
        .editArea(this.data.model.ID.toString(), {
          area: this.areaControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root.addArea({ area: this.areaControl.value }).subscribe({
        next: () => this.ref.close({ fetchData: true }),
      });
    }
  }

}
