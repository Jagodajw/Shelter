import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleService } from '../../services/api/people.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterPeopleResponse } from 'backend/src/views/AnimalsView';
import { Observable, map, mergeMap, take, tap } from 'rxjs';

export interface DataPersonPopupData {
  status$: Observable<boolean>;
  peopleId: number;
}

interface MappedResponseOfPersonGetter {
  data: RegisterPeopleResponse;
  groupName: string;
}

@Component({
  selector: 'app-data-person-action-popup',
  templateUrl: './data-person-action-popup.component.html',
  styleUrls: ['./data-person-action-popup.component.scss'],
})
export class DataPersonActionPopupComponent implements OnInit {
  dataPersonTakeAwayEdit!: FormGroup;
  private groupName!: string;
  constructor(
    private readonly _form: FormBuilder,
    private readonly api: PeopleService,
    private readonly ref: MatDialogRef<DataPersonActionPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: DataPersonPopupData
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }
  public buildForm(): void {
    this.data.status$
      .pipe(
        map((status: boolean) => {
          this.groupName = status ? 'dataPersonTakeAway' : 'registerPeople';
          this.dataPersonTakeAwayEdit = this._form.group({
            [this.groupName]: this.personGroup(),
          });

          return this.groupName;
        }),
        mergeMap((groupName: string) =>
          this.api
            .getPerson(this.data.peopleId)
            .pipe(map((data: RegisterPeopleResponse) => ({ data, groupName })))
        )
      )
      .subscribe({
        next: (res: MappedResponseOfPersonGetter) => this.patchForm(res),
      });
  }

  private personGroup(): FormGroup {
    return this._form.group({
      name: [''],
      id_number: [''],
      pesel: [''],
      nip: [''],
      email: [''],
      telephone: [''],
      adress: [''],
      city: [''],
      zip_code: [''],
      commune: [''],
      province_id: [''],
      description: [''],
      type_of_person: [''],
    });
  }

  private patchForm({ groupName, data }: MappedResponseOfPersonGetter): void {
    const chosenGroup: FormGroup = this.dataPersonTakeAwayEdit.get(
      groupName
    ) as FormGroup;

    chosenGroup!.patchValue(data);
    chosenGroup.get('province_id')?.patchValue(data.province);
  }

  public updateDataPerson(): void {
    this.api
      .updatePerson(
        this.data.peopleId,
        this.dataPersonTakeAwayEdit.get(this.groupName)?.value
      )
      .subscribe({ next: () => this.ref.close({ fetchData: true }) });
  }
}
