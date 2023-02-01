import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AnimalTableResponse } from 'backend/src/models/AnimalsModel';
import { genderList } from 'src/app/data/data-list';
import { Select } from '../../../../components/select/select';

@Component({
  selector: 'app-pets-table',
  templateUrl: './pets-table.component.html',
  styleUrls: ['./pets-table.component.scss'],
})
export class PetsTableComponent {
  @Input() public isVisibiltyHeader: boolean = true;
  @Input() set pets(newPets: AnimalTableResponse[] | null) {
    if (newPets === null) return;
    this.petsTable = new MatTableDataSource<AnimalTableResponse>(newPets);
  }
  @Output() outPetEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletePositionEmitter: EventEmitter<void> =
    new EventEmitter<void>();
  public genderList: Select[] = genderList;
  public petsTable = new MatTableDataSource<AnimalTableResponse>();
  public displayedColumns: string[] = [
    'name',
    'species',
    'breed',
    'gender',
    'community',
    'area',
    'ID',
    'Nr-chip',
    // 'handOverTheAnimal',
    'action',
  ];

  constructor(public readonly router: Router) {}

  public openPetDetail(petId: string) {
    this.router.navigate(['/app-view/pet-detail/', petId]);
  }

  public outPet(petId: string): void {
    this.outPetEmitter.emit(petId);
  }

  public deletePosition(): void {
    this.deletePositionEmitter.emit();
  }
}