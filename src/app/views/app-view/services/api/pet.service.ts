import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AdoptDataByAnimalIdResponse,
  AdoptionResponse,
  AnimalAdoptionRequest,
  AnimalData,
  AnimalDetailResponse,
  AnimalQuery,
  AnimalStatus,
  AnimalTableResponse,
  EditAnimalAdoptionRequest,
  RegisterAddAnimalRequest,
  RegisterAddAnimalResponse,
  RegisterEditAnimalRequest,
  RegisterPersonAddRequest,
  RegisterPersonEditRequest,
} from 'backend/src/views/AnimalsView';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class PetService extends ApiService {
  constructor(public readonly http: HttpClient) {
    super();
  }

  public getPets(
    status: AnimalStatus = 'staying'
  ): Observable<AnimalTableResponse[]> {
    return this.http.get<AnimalTableResponse[]>(
      `${this.rootUrl}/animals/${status}`
    );
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

  public adoptPet(
    petId: string,
    model: {
      dataPetOut: AnimalAdoptionRequest;
      dataPersonTakeAway: RegisterPersonAddRequest;
    }
  ): Observable<AdoptionResponse> {
    return this.http.post<AdoptionResponse>(
      `${this.rootUrl}/adoptAnimal/${petId}`,
      model
    );
  }

  public editPet(
    updateModel: RegisterEditAnimalRequest
  ): Observable<RegisterAddAnimalResponse> {
    return this.http.put<RegisterAddAnimalResponse>(
      `${this.rootUrl}/animalRegistration`,
      updateModel
    );
  }

  public getPetAdoptDataById(
    petId: string
  ): Observable<AdoptDataByAnimalIdResponse> {
    return this.http.get<AdoptDataByAnimalIdResponse>(
      `${this.rootUrl}/adoptAnimal/${petId}`
    );
  }

  public getPetsByQuery(
    query: AnimalQuery,
    status: AnimalStatus = 'staying'
  ): Observable<AnimalTableResponse[]> {
    return this.http.post<AnimalTableResponse[]>(
      `${this.rootUrl}/animalsByQuery/${status}`,
      query
    );
  }

  public deletePet(petId: string): Observable<AnimalData> {
    return this.http.delete<AnimalData>(`${this.rootUrl}/animal/${petId}`);
  }

  public getNumberOfAnimalsVaccinationChecks(): Observable<number> {
    return this.http.get<number>(
      `${this.rootUrl}/numberOfAnimalsVaccinationChecks`
    );
  }

  public getNumberOfAnimalsReleaseControl(): Observable<number> {
    return this.http.get<number>(
      `${this.rootUrl}/numberOfAnimalsReleaseControl`
    );
  }

  public editAdoptPetData(
    petId: string,
    model: {
      dataPetOut: EditAnimalAdoptionRequest;
      dataPersonTakeAway: RegisterPersonEditRequest;
    }
  ): Observable<AdoptionResponse> {
    return this.http.put<AdoptionResponse>(
      `${this.rootUrl}/adoptAnimal/${petId}`,
      model
    );
  }
}
