import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AreaRequest,
  AreaResponse,
  BreedRequest,
  BreedResponse,
  CityRequest,
  CityResponse,
  ColorRequest,
  ColorResponse,
  CommuneRequest,
  CommuneResponse,
  ProvinceResponse,
  SpeciesRequest,
  SpeciesResponse,
  TypeAcceptanceResponse,
  TypeAdoptionRequest,
  TypeAdoptionResponse,
} from 'backend/src/views/DictionaryView';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Injectable()
export class DictionaryService extends ApiService {
  constructor(public readonly http: HttpClient) {
    super();
  }

  // need to add CRUD for dictonary models like city. etc.

  public getCity(): Observable<CityResponse[]> {
    return this.http.get<CityResponse[]>(`${this.rootUrl}/cities`);
  }

  public addCity(model: CityRequest): Observable<CityResponse> {
    return this.http.post<CityResponse>(`${this.rootUrl}/city`, model);
  }

  public editCity(
    cityId: string,
    model: CityRequest
  ): Observable<CityResponse> {
    return this.http.put<CityResponse>(`${this.rootUrl}/city/${cityId}`, model);
  }

  public deleteCity(cityId: string): Observable<CityResponse> {
    return this.http.delete<CityResponse>(`${this.rootUrl}/city/${cityId}`);
  }

  public getCommune(): Observable<CommuneResponse[]> {
    return this.http.get<CommuneResponse[]>(`${this.rootUrl}/commune`);
  }

  public addCommune(model: CommuneRequest): Observable<CommuneResponse> {
    return this.http.post<CommuneResponse>(`${this.rootUrl}/commune`, model);
  }

  public getSpecies(): Observable<SpeciesResponse[]> {
    return this.http.get<SpeciesResponse[]>(`${this.rootUrl}/species`);
  }

  public addSpecies(model: SpeciesRequest): Observable<SpeciesResponse> {
    return this.http.post<SpeciesResponse>(`${this.rootUrl}/species`, model);
  }

  public editSpecies(
    speciesId: string,
    model: SpeciesRequest
  ): Observable<SpeciesResponse> {
    return this.http.put<SpeciesResponse>(
      `${this.rootUrl}/species/${speciesId}`,
      model
    );
  }

  public deleteSpecies(speciesId: string): Observable<SpeciesResponse> {
    return this.http.delete<SpeciesResponse>(
      `${this.rootUrl}/species/${speciesId}`
    );
  }

  public getBreed(speciesId?: number): Observable<BreedResponse[]> {
    if (speciesId === undefined)
      return this.http.get<BreedResponse[]>(`${this.rootUrl}/breed`);
    return this.http.get<BreedResponse[]>(`${this.rootUrl}/breed/${speciesId}`);
  }

  public addBreed(model: BreedRequest): Observable<BreedResponse> {
    return this.http.post<BreedResponse>(`${this.rootUrl}/breed`, model);
  }

  public getColors(): Observable<ColorResponse[]> {
    return this.http.get<ColorResponse[]>(`${this.rootUrl}/colors`);
  }

  public addColor(model: ColorRequest): Observable<ColorResponse> {
    return this.http.post<ColorResponse>(`${this.rootUrl}/color`, model);
  }

  public editColor(
    colorId: string,
    model: ColorRequest
  ): Observable<ColorResponse> {
    return this.http.put<ColorResponse>(
      `${this.rootUrl}/color/${colorId}`,
      model
    );
  }

  public deleteColor(colorId: string): Observable<ColorResponse> {
    return this.http.delete<ColorResponse>(`${this.rootUrl}/color/${colorId}`);
  }
  
  public getArea(): Observable<AreaResponse[]> {
    return this.http.get<AreaResponse[]>(`${this.rootUrl}/area`);
  }

  public addArea(model: AreaRequest): Observable<AreaResponse> {
    return this.http.post<AreaResponse>(`${this.rootUrl}/area`, model);
  }

  public getTypeAdoptation(): Observable<TypeAdoptionResponse[]> {
    return this.http.get<TypeAdoptionResponse[]>(
      `${this.rootUrl}/typeAdoption`
    );
  }

  public addTypeAdoptation(
    model: TypeAdoptionRequest
  ): Observable<TypeAdoptionResponse> {
    return this.http.post<TypeAdoptionResponse>(
      `${this.rootUrl}/typeAdoption`,
      model
    );
  }

  public getProvince(): Observable<ProvinceResponse[]> {
    return this.http.get<ProvinceResponse[]>(`${this.rootUrl}/province`);
  }

  public getTypeAcceptance(): Observable<TypeAcceptanceResponse[]> {
    return this.http.get<TypeAcceptanceResponse[]>(
      `${this.rootUrl}/typeAcceptance`
    );
  }
}
