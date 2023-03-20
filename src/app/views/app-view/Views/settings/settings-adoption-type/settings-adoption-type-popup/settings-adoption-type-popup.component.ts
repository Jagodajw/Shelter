import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeAdoptionResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';

interface Data {
  title: string;
  model: TypeAdoptionResponse | undefined;
}
@Component({
  selector: 'app-settings-adoption-type-popup',
  templateUrl: './settings-adoption-type-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],

})
export class SettingsAdoptionTypePopupComponent implements OnInit {
  public typeAdoptionControl: FormControl = new FormControl();

  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsAdoptionTypePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {
    if (this.data.model !== undefined)
      this.typeAdoptionControl.patchValue(this.data.model.type_adoption);
  }

  addTypeAdoption(): void {
    if (this.data.model) {
      this.root
        .editTypeAdoptation(this.data.model.ID.toString(), {
          type_adoption: this.typeAdoptionControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root.addTypeAdoptation({ type_adoption: this.typeAdoptionControl.value }).subscribe({
        next: () => this.ref.close({ fetchData: true }),
      });
    }
  }
}
