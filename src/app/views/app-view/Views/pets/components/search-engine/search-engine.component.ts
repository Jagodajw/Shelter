import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AnimalQuery } from 'backend/src/models/AnimalsModel';
import { filter, map, Observable, of, tap } from 'rxjs';
import { genderList, sizeList } from 'src/app/data/data-list';
import { Select } from 'src/app/views/app-view/components/select/select';
import { PetService } from 'src/app/views/app-view/services/api/pet.service';
import { ShelterService } from 'src/app/views/app-view/services/shelter.service';
import { PetsRootService } from '../../services/pets-root.service';

@UntilDestroy()
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
  public numberOfAnimalsVaccinationChecks!: Observable<number>;
  public numberOfAnimalsReleaseControl!: Observable<number>;
  public status$: Observable<boolean> = this.root
    .status$ as Observable<boolean>;
  constructor(
    private _form: FormBuilder,
    private root: PetsRootService,
    private apiPet: PetService,
    private readonly shelter: ShelterService
  ) {}

  ngOnInit(): void {
    this.shelterChangeDetector();
    this.buildForm();
    this.resetSearchQuerDetector();
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
    const data: AnimalQuery = {
      species_id: this.searchEngineForm.get('species_id')?.value?.ID,
      breed_id: this.searchEngineForm.get('breed_id')?.value?.ID,
      commune_id: this.searchEngineForm.get('commune_id')?.value?.ID,
      area_id: this.searchEngineForm.get('area_id')?.value?.ID,
      color_id: this.searchEngineForm.get('color_id')?.value?.ID,
      gender: this.searchEngineForm.get('gender')?.value ?? undefined,
      size: this.searchEngineForm.get('size')?.value ?? undefined,
      sterilization:
        this.searchEngineForm.get('sterilization')?.value ?? undefined,
      search: this.searchEngineForm.get('search')?.value ?? undefined,
      cuarantine: this.searchEngineForm.get('cuarantine')?.value ?? undefined,
      unvaccinated:
        this.searchEngineForm.get('unvaccinated')?.value ?? undefined,
      datePickerBirthFromTo:
        this.searchEngineForm.get('datePickerBirthFromTo')?.value ?? undefined,
      datePickerAccepted:
        this.searchEngineForm.get('datePickerAccepted')?.value ?? undefined,
    };
    this.root.searchQuery$.next(data);
  }

  resetSearch(): void {
    this.root.searchQuery$.next(null);
  }

  private resetSearchQuerDetector(): void {
    this.root.searchQuery$
      .asObservable()
      .pipe(
        filter((searchQuery: AnimalQuery | null) => searchQuery === null),
        untilDestroyed(this)
      )
      .subscribe({
        next: () => this.searchEngineForm.reset(),
      });
  }

  private shelterChangeDetector(): void {
    this.shelter.selectedShelterChangeDetector$
      .pipe(
        tap(() => {
          this.setNumberOfAnimals();
        })
      )
      .subscribe();
  }

  private setNumberOfAnimals(): void {
    this.numberOfAnimalsVaccinationChecks =
      this.apiPet.getNumberOfAnimalsVaccinationChecks();

    this.numberOfAnimalsReleaseControl =
      this.apiPet.getNumberOfAnimalsReleaseControl();
  }
}
