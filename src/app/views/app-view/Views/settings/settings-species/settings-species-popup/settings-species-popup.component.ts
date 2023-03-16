import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';

@Component({
  selector: 'app-settings-species-popup',
  templateUrl: './settings-species-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsSpeciesPopupComponent implements OnInit {
  public speciesControl: FormControl = new FormControl();

  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsSpeciesPopupComponent>
  ) {}
  ngOnInit(): void {}

  addSpecies(): void {
    this.root.addSpecies({ species: this.speciesControl.value }).subscribe({
      next: () => this.ref.close({ fetchData: true }),
    });
  }
}
