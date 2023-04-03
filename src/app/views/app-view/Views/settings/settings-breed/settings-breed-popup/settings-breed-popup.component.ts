import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BreedListResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';

interface Data {
  title: string;
  model: BreedListResponse | undefined;
}
@Component({
  selector: 'app-settings-breed-popup',
  templateUrl: './settings-breed-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsBreedPopupComponent implements OnInit {
  public breedForm!: FormGroup;

  constructor(
    private readonly root: DictionaryService,
    private readonly ref: MatDialogRef<SettingsBreedPopupComponent>,
    private readonly _form: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.breedForm.get('species')?.enable();
    if (this.data.model !== undefined) {
      this.breedForm.get('species')?.patchValue(this.data.model.species);
      this.breedForm.get('breed')?.patchValue(this.data.model.breed);
      this.breedForm.get('species')?.disable();
    }
  }

  private buildForm(): void {
    this.breedForm = this._form.group({
      species: [],
      breed: [],
    });
  }

  addBreed(): void {
    if (this.data.model) {
      this.breedForm.get('species')?.disable();
      this.root
        .editBreed(this.data.model.ID.toString(), this.breedForm.getRawValue())
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root.addBreed(this.breedForm.value).subscribe({
        next: () => this.ref.close({ fetchData: true }),
      });
    }
  }
}
