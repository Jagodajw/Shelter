import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpeciesResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';
interface Data {
  title: string;
  model: SpeciesResponse | undefined;
}
@Component({
  selector: 'app-settings-species-popup',
  templateUrl: './settings-species-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsSpeciesPopupComponent implements OnInit {
  public speciesControl: FormControl = new FormControl();

  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsSpeciesPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}
  ngOnInit(): void {
    if (this.data.model !== undefined)
      this.speciesControl.patchValue(this.data.model.species);
  }

  addSpecies(): void {
    if (this.data.model) {
      this.root
        .editSpecies(this.data.model.ID.toString(), {
          species: this.speciesControl.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root.addSpecies({ species: this.speciesControl.value }).subscribe({
        next: () => this.ref.close({ fetchData: true }),
      });
    }
  }
}