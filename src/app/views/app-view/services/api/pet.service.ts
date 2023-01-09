import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AnimalDetailResponse,
  AnimalTableResponse,
  RegisterAddAnimalRequest,
  RegisterAddAnimalResponse,
} from 'backend/src/models/AnimalsModel';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class PetService extends ApiService {
  constructor(public readonly http: HttpClient) {
    super();
  }

  public getPets(): Observable<AnimalTableResponse[]> {
    return this.http.get<AnimalTableResponse[]>(`${this.rootUrl}/animals`);
  }

  public getPetById(petId: string): Observable<AnimalDetailResponse> {
    return this.http.get<AnimalDetailResponse>(
      `${this.rootUrl}/animalDataRegister/${petId}`
    );
  }

  public addPet(
    model: RegisterAddAnimalRequest
  ): Observable<RegisterAddAnimalResponse> {
    return this.http.post<RegisterAddAnimalResponse>(
      `${this.rootUrl}/animalRegistration`,
      model
    );
  }
}
