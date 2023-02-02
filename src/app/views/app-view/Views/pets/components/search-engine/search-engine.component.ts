import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { map, Observable, of } from 'rxjs';
import { genderList, sizeList } from 'src/app/data/data-list';
import { Select } from 'src/app/views/app-view/components/select/select';

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss'],
})
export class SearchEngineComponent implements OnInit {
  public searchEngineForm!: FormGroup;
  public sizeList: Select[] = sizeList;
  public genderList: Select[] = genderList;
  public speciesId!: Observable<number | undefined>;
  constructor(private _form: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    this.speciesId =
      this.searchEngineForm.get('species_id')?.valueChanges.pipe(
        map((species: Select | null | string) => {
          this.searchEngineForm.get('breed_id')?.patchValue('');
          return ((species as Select)?.ID || undefined) as number | undefined;
        })
      ) ?? of(undefined);
  }

  public buildForm(): void {
    this.searchEngineForm = this._form.group({
      species_id: [undefined],
      breed_id: [undefined],
      commune_id: [undefined],
      area_id: [undefined],
      color_id: [undefined],
      gender: [undefined],
      size: [undefined],
      sterilization: [undefined],
      search: [undefined],
      cuarantine: [false],
      unvaccinated: [false],
      datePickerBirthFromTo: [undefined],
      datePickerAccepted: [undefined],
    });
  }

  searchAnimals(): void {
    const data = {
      spspecies_id: this.searchEngineForm.get('species_id')?.value?.ID,
      breed_id: this.searchEngineForm.get('breed_id')?.value?.ID,
      commune_id: this.searchEngineForm.get('commune_id')?.value?.ID,
      area_id: this.searchEngineForm.get('area_id')?.value?.ID,
      color_id: this.searchEngineForm.get('color_id')?.value?.ID,
      gender: this.searchEngineForm.get('gender')?.value,
      size: this.searchEngineForm.get('size')?.value,
      sterilization: this.searchEngineForm.get('sterilization')?.value,
      search: this.searchEngineForm.get('search')?.value,
      cuarantine: this.searchEngineForm.get('cuarantine')?.value,
      unvaccinated: this.searchEngineForm.get('unvaccinated')?.value,
      datePickerBirthFromTo: this.searchEngineForm.get('datePickerBirthFromTo')
        ?.value,
      datePickerAccepted:
        this.searchEngineForm.get('datePickerAccepted')?.value,
    };
    console.log(data);
  }
}
