import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CityResponse } from 'backend/src/views/DictionaryView';
import { DictionaryService } from 'src/app/views/app-view/services/api/dictionary.service';

interface Data {
  title: string;
  model: CityResponse | undefined;
}
@Component({
  selector: 'app-settings-city-popup',
  templateUrl: './settings-city-popup.component.html',
  styleUrls: ['../../../../../../shared/style/popup.component.scss'],
})
export class SettingsCityPopupComponent implements OnInit {
  public cityForm!: FormGroup;
  constructor(
    private readonly _form: FormBuilder,
    private readonly ref: MatDialogRef<SettingsCityPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private readonly root: DictionaryService
  ) {}

  ngOnInit(): void {
    this.buildForm();

    if (this.data.model !== undefined) {
      this.cityForm.patchValue(this.data.model);
    }
  }

  private buildForm(): void {
    this.cityForm = this._form.group({
      city: [],
      zip_code: [],
    });
  }

  addCity(): void {
    if (this.data.model) {
      this.root
        .editCity(this.data.model.ID.toString(), {
          city: this.cityForm?.get('city')?.value,
          zip_code: this.cityForm?.get('zip_code')?.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    } else {
      this.root
        .addCity({
          city: this.cityForm?.get('city')?.value,
          zip_code: this.cityForm?.get('zip_code')?.value,
        })
        .subscribe({
          next: () => this.ref.close({ fetchData: true }),
        });
    }
  }
}
