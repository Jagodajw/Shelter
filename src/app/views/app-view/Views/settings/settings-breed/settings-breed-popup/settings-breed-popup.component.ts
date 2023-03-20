import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreedResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';

interface Data {
  title: string;
  model: BreedResponse | undefined;
}
@Component({
  selector: 'app-settings-breed-popup',
  templateUrl: './settings-breed-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsBreedPopupComponent implements OnInit {
  public breedControl: FormControl = new FormControl();

  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsBreedPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {
    if (this.data.model !== undefined)
      this.breedControl.patchValue(this.data.model.breed);
  }

  addBreed(): void {
    // if (this.data.model) {
    //   this.root
    //     .editBreed(this.data.model.ID.toString(), {
    //       breed: this.breedControl.value,
    //     })
    //     .subscribe({
    //       next: () => this.ref.close({ fetchData: true }),
    //     });
    // } else {
    //   this.root.addBreed({ breed: this.breedControl.value }).subscribe({
    //     next: () => this.ref.close({ fetchData: true }),
    //   });
    // }
  }
}
