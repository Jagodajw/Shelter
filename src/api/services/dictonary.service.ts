/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class DictonaryService extends __BaseService {
  static readonly getSettingsCitySheltersIdPath = '/settingsCity/{sheltersId}';
  static readonly getSettingsCommuneSheltersIdPath = '/settingsCommune/{sheltersId}';
  static readonly getSettingsSpeciesSheltersIdPath = '/settingsSpecies/{sheltersId}';
  static readonly getSettingsBreedSheltersIdPath = '/settingsBreed/{sheltersId}';
  static readonly getSettingsColorSheltersIdPath = '/settingsColor/{sheltersId}';
  static readonly getSettingsAreaSheltersIdPath = '/settingsArea/{sheltersId}';
  static readonly getSettingsTypeAdoptionSheltersIdPath = '/settingsTypeAdoption/{sheltersId}';
  static readonly deleteSettingsCityCityIdPath = '/settingsCity/{cityId}';
  static readonly deleteSettingsCommuneCommuneIdPath = '/settingsCommune/{communeId}';
  static readonly deleteSettingsSpeciesSpeciesIdPath = '/settingsSpecies/{speciesId}';
  static readonly deleteSettingsBreedBreedIdPath = '/settingsBreed/{breedId}';
  static readonly deleteSettingsColorColorIdPath = '/settingsColor/{colorId}';
  static readonly deleteSettingsAreaAreaIdPath = '/settingsArea/{areaId}';
  static readonly deleteSettingsTypeAdoptionTypeAdoptionIdPath = '/settingsTypeAdoption/{typeAdoptionId}';
  static readonly putSettingsTypeAdoptionTypeAdoptionIdPath = '/settingsTypeAdoption/{typeAdoptionId}';
  static readonly putSettingsCityIdCityIdPath = '/settingsCityId/{cityId}';
  static readonly putSettingsCommuneIdCommuneIdPath = '/settingsCommuneId/{communeId}';
  static readonly putSettingsSpeciesIdSpeciesIdPath = '/settingsSpeciesId/{speciesId}';
  static readonly putSettingsBreedIdBreedIdPath = '/settingsBreedId/{breedId}';
  static readonly putSettingsColorIdColorIdPath = '/settingsColorId/{colorId}';
  static readonly putSettingsAreaIdAreaIdPath = '/settingsAreaId/{areaId}';
  static readonly postSettingsAddCityPath = '/settingsAddCity/';
  static readonly postSettingsAddCommunePath = '/settingsAddCommune/';
  static readonly postSettingsAddSpeciesPath = '/settingsAddSpecies/';
  static readonly postSettingsAddColorPath = '/settingsAddColor/';
  static readonly postSettingsAddAreaPath = '/settingsAddArea/';
  static readonly postSettingsTypeAdoptionPath = '/settingsTypeAdoption/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `DictonaryService.GetSettingsCitySheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCitySheltersIdResponse(params: DictonaryService.GetSettingsCitySheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsCity/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsCitySheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCitySheltersId(params: DictonaryService.GetSettingsCitySheltersIdParams): __Observable<null> {
    return this.getSettingsCitySheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.GetSettingsCommuneSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCommuneSheltersIdResponse(params: DictonaryService.GetSettingsCommuneSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsCommune/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsCommuneSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsCommuneSheltersId(params: DictonaryService.GetSettingsCommuneSheltersIdParams): __Observable<null> {
    return this.getSettingsCommuneSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.GetSettingsSpeciesSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsSpeciesSheltersIdResponse(params: DictonaryService.GetSettingsSpeciesSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsSpecies/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsSpeciesSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsSpeciesSheltersId(params: DictonaryService.GetSettingsSpeciesSheltersIdParams): __Observable<null> {
    return this.getSettingsSpeciesSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.GetSettingsBreedSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsBreedSheltersIdResponse(params: DictonaryService.GetSettingsBreedSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsBreed/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsBreedSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsBreedSheltersId(params: DictonaryService.GetSettingsBreedSheltersIdParams): __Observable<null> {
    return this.getSettingsBreedSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.GetSettingsColorSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsColorSheltersIdResponse(params: DictonaryService.GetSettingsColorSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsColor/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsColorSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsColorSheltersId(params: DictonaryService.GetSettingsColorSheltersIdParams): __Observable<null> {
    return this.getSettingsColorSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.GetSettingsAreaSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsAreaSheltersIdResponse(params: DictonaryService.GetSettingsAreaSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsArea/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsAreaSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsAreaSheltersId(params: DictonaryService.GetSettingsAreaSheltersIdParams): __Observable<null> {
    return this.getSettingsAreaSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.GetSettingsTypeAdoptionSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsTypeAdoptionSheltersIdResponse(params: DictonaryService.GetSettingsTypeAdoptionSheltersIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/settingsTypeAdoption/${encodeURIComponent(String(params.sheltersId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.GetSettingsTypeAdoptionSheltersIdParams` containing the following parameters:
   *
   * - `sheltersId`:
   *
   * - `authorization`:
   */
  getSettingsTypeAdoptionSheltersId(params: DictonaryService.GetSettingsTypeAdoptionSheltersIdParams): __Observable<null> {
    return this.getSettingsTypeAdoptionSheltersIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsCityCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `authorization`:
   */
  deleteSettingsCityCityIdResponse(params: DictonaryService.DeleteSettingsCityCityIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsCity/${encodeURIComponent(String(params.cityId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsCityCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `authorization`:
   */
  deleteSettingsCityCityId(params: DictonaryService.DeleteSettingsCityCityIdParams): __Observable<null> {
    return this.deleteSettingsCityCityIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsCommuneCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `authorization`:
   */
  deleteSettingsCommuneCommuneIdResponse(params: DictonaryService.DeleteSettingsCommuneCommuneIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsCommune/${encodeURIComponent(String(params.communeId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsCommuneCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `authorization`:
   */
  deleteSettingsCommuneCommuneId(params: DictonaryService.DeleteSettingsCommuneCommuneIdParams): __Observable<null> {
    return this.deleteSettingsCommuneCommuneIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsSpeciesSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `authorization`:
   */
  deleteSettingsSpeciesSpeciesIdResponse(params: DictonaryService.DeleteSettingsSpeciesSpeciesIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsSpecies/${encodeURIComponent(String(params.speciesId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsSpeciesSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `authorization`:
   */
  deleteSettingsSpeciesSpeciesId(params: DictonaryService.DeleteSettingsSpeciesSpeciesIdParams): __Observable<null> {
    return this.deleteSettingsSpeciesSpeciesIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsBreedBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `authorization`:
   */
  deleteSettingsBreedBreedIdResponse(params: DictonaryService.DeleteSettingsBreedBreedIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsBreed/${encodeURIComponent(String(params.breedId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsBreedBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `authorization`:
   */
  deleteSettingsBreedBreedId(params: DictonaryService.DeleteSettingsBreedBreedIdParams): __Observable<null> {
    return this.deleteSettingsBreedBreedIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsColorColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `authorization`:
   */
  deleteSettingsColorColorIdResponse(params: DictonaryService.DeleteSettingsColorColorIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsColor/${encodeURIComponent(String(params.colorId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsColorColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `authorization`:
   */
  deleteSettingsColorColorId(params: DictonaryService.DeleteSettingsColorColorIdParams): __Observable<null> {
    return this.deleteSettingsColorColorIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsAreaAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `authorization`:
   */
  deleteSettingsAreaAreaIdResponse(params: DictonaryService.DeleteSettingsAreaAreaIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsArea/${encodeURIComponent(String(params.areaId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsAreaAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `authorization`:
   */
  deleteSettingsAreaAreaId(params: DictonaryService.DeleteSettingsAreaAreaIdParams): __Observable<null> {
    return this.deleteSettingsAreaAreaIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `authorization`:
   */
  deleteSettingsTypeAdoptionTypeAdoptionIdResponse(params: DictonaryService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/settingsTypeAdoption/${encodeURIComponent(String(params.typeAdoptionId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `authorization`:
   */
  deleteSettingsTypeAdoptionTypeAdoptionId(params: DictonaryService.DeleteSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<null> {
    return this.deleteSettingsTypeAdoptionTypeAdoptionIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsTypeAdoptionTypeAdoptionIdResponse(params: DictonaryService.PutSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsTypeAdoption/${encodeURIComponent(String(params.typeAdoptionId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsTypeAdoptionTypeAdoptionIdParams` containing the following parameters:
   *
   * - `typeAdoptionId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsTypeAdoptionTypeAdoptionId(params: DictonaryService.PutSettingsTypeAdoptionTypeAdoptionIdParams): __Observable<null> {
    return this.putSettingsTypeAdoptionTypeAdoptionIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsCityIdCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCityIdCityIdResponse(params: DictonaryService.PutSettingsCityIdCityIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsCityId/${encodeURIComponent(String(params.cityId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsCityIdCityIdParams` containing the following parameters:
   *
   * - `cityId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCityIdCityId(params: DictonaryService.PutSettingsCityIdCityIdParams): __Observable<null> {
    return this.putSettingsCityIdCityIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsCommuneIdCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCommuneIdCommuneIdResponse(params: DictonaryService.PutSettingsCommuneIdCommuneIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsCommuneId/${encodeURIComponent(String(params.communeId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsCommuneIdCommuneIdParams` containing the following parameters:
   *
   * - `communeId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsCommuneIdCommuneId(params: DictonaryService.PutSettingsCommuneIdCommuneIdParams): __Observable<null> {
    return this.putSettingsCommuneIdCommuneIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsSpeciesIdSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsSpeciesIdSpeciesIdResponse(params: DictonaryService.PutSettingsSpeciesIdSpeciesIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsSpeciesId/${encodeURIComponent(String(params.speciesId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsSpeciesIdSpeciesIdParams` containing the following parameters:
   *
   * - `speciesId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsSpeciesIdSpeciesId(params: DictonaryService.PutSettingsSpeciesIdSpeciesIdParams): __Observable<null> {
    return this.putSettingsSpeciesIdSpeciesIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsBreedIdBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsBreedIdBreedIdResponse(params: DictonaryService.PutSettingsBreedIdBreedIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsBreedId/${encodeURIComponent(String(params.breedId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsBreedIdBreedIdParams` containing the following parameters:
   *
   * - `breedId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsBreedIdBreedId(params: DictonaryService.PutSettingsBreedIdBreedIdParams): __Observable<null> {
    return this.putSettingsBreedIdBreedIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsColorIdColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsColorIdColorIdResponse(params: DictonaryService.PutSettingsColorIdColorIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsColorId/${encodeURIComponent(String(params.colorId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsColorIdColorIdParams` containing the following parameters:
   *
   * - `colorId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsColorIdColorId(params: DictonaryService.PutSettingsColorIdColorIdParams): __Observable<null> {
    return this.putSettingsColorIdColorIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PutSettingsAreaIdAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsAreaIdAreaIdResponse(params: DictonaryService.PutSettingsAreaIdAreaIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/settingsAreaId/${encodeURIComponent(String(params.areaId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PutSettingsAreaIdAreaIdParams` containing the following parameters:
   *
   * - `areaId`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  putSettingsAreaIdAreaId(params: DictonaryService.PutSettingsAreaIdAreaIdParams): __Observable<null> {
    return this.putSettingsAreaIdAreaIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PostSettingsAddCityParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCityResponse(params: DictonaryService.PostSettingsAddCityParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddCity/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PostSettingsAddCityParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCity(params: DictonaryService.PostSettingsAddCityParams): __Observable<null> {
    return this.postSettingsAddCityResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PostSettingsAddCommuneParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCommuneResponse(params: DictonaryService.PostSettingsAddCommuneParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddCommune/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PostSettingsAddCommuneParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddCommune(params: DictonaryService.PostSettingsAddCommuneParams): __Observable<null> {
    return this.postSettingsAddCommuneResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PostSettingsAddSpeciesParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddSpeciesResponse(params: DictonaryService.PostSettingsAddSpeciesParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddSpecies/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PostSettingsAddSpeciesParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddSpecies(params: DictonaryService.PostSettingsAddSpeciesParams): __Observable<null> {
    return this.postSettingsAddSpeciesResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PostSettingsAddColorParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddColorResponse(params: DictonaryService.PostSettingsAddColorParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddColor/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PostSettingsAddColorParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddColor(params: DictonaryService.PostSettingsAddColorParams): __Observable<null> {
    return this.postSettingsAddColorResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PostSettingsAddAreaParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddAreaResponse(params: DictonaryService.PostSettingsAddAreaParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsAddArea/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PostSettingsAddAreaParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsAddArea(params: DictonaryService.PostSettingsAddAreaParams): __Observable<null> {
    return this.postSettingsAddAreaResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `DictonaryService.PostSettingsTypeAdoptionParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsTypeAdoptionResponse(params: DictonaryService.PostSettingsTypeAdoptionParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.sheltersId != null) __headers = __headers.set('shelters_id', params.sheltersId.toString());
    __body = params.body;
    if (params.authorization != null) __headers = __headers.set('authorization', params.authorization.toString());
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/settingsTypeAdoption/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `DictonaryService.PostSettingsTypeAdoptionParams` containing the following parameters:
   *
   * - `shelters_id`:
   *
   * - `body`:
   *
   * - `authorization`:
   */
  postSettingsTypeAdoption(params: DictonaryService.PostSettingsTypeAdoptionParams): __Observable<null> {
    return this.postSettingsTypeAdoptionResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module DictonaryService {

  /**
   * Parameters for getSettingsCitySheltersId
   */
  export interface GetSettingsCitySheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsCommuneSheltersId
   */
  export interface GetSettingsCommuneSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsSpeciesSheltersId
   */
  export interface GetSettingsSpeciesSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsBreedSheltersId
   */
  export interface GetSettingsBreedSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsColorSheltersId
   */
  export interface GetSettingsColorSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsAreaSheltersId
   */
  export interface GetSettingsAreaSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for getSettingsTypeAdoptionSheltersId
   */
  export interface GetSettingsTypeAdoptionSheltersIdParams {
    sheltersId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsCityCityId
   */
  export interface DeleteSettingsCityCityIdParams {
    cityId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsCommuneCommuneId
   */
  export interface DeleteSettingsCommuneCommuneIdParams {
    communeId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsSpeciesSpeciesId
   */
  export interface DeleteSettingsSpeciesSpeciesIdParams {
    speciesId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsBreedBreedId
   */
  export interface DeleteSettingsBreedBreedIdParams {
    breedId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsColorColorId
   */
  export interface DeleteSettingsColorColorIdParams {
    colorId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsAreaAreaId
   */
  export interface DeleteSettingsAreaAreaIdParams {
    areaId: string;
    authorization?: string;
  }

  /**
   * Parameters for deleteSettingsTypeAdoptionTypeAdoptionId
   */
  export interface DeleteSettingsTypeAdoptionTypeAdoptionIdParams {
    typeAdoptionId: string;
    authorization?: string;
  }

  /**
   * Parameters for putSettingsTypeAdoptionTypeAdoptionId
   */
  export interface PutSettingsTypeAdoptionTypeAdoptionIdParams {
    typeAdoptionId: string;
    body?: {type_adoption?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsCityIdCityId
   */
  export interface PutSettingsCityIdCityIdParams {
    cityId: string;
    body?: {city?: any, zip_code?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsCommuneIdCommuneId
   */
  export interface PutSettingsCommuneIdCommuneIdParams {
    communeId: string;
    body?: {commune?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsSpeciesIdSpeciesId
   */
  export interface PutSettingsSpeciesIdSpeciesIdParams {
    speciesId: string;
    body?: {species?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsBreedIdBreedId
   */
  export interface PutSettingsBreedIdBreedIdParams {
    breedId: string;
    body?: {breed?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsColorIdColorId
   */
  export interface PutSettingsColorIdColorIdParams {
    colorId: string;
    body?: {color?: any};
    authorization?: string;
  }

  /**
   * Parameters for putSettingsAreaIdAreaId
   */
  export interface PutSettingsAreaIdAreaIdParams {
    areaId: string;
    body?: {area?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddCity
   */
  export interface PostSettingsAddCityParams {
    sheltersId?: string;
    body?: {city?: any, zip_code?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddCommune
   */
  export interface PostSettingsAddCommuneParams {
    sheltersId?: string;
    body?: {commune?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddSpecies
   */
  export interface PostSettingsAddSpeciesParams {
    sheltersId?: string;
    body?: {species?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddColor
   */
  export interface PostSettingsAddColorParams {
    sheltersId?: string;
    body?: {color?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsAddArea
   */
  export interface PostSettingsAddAreaParams {
    sheltersId?: string;
    body?: {area?: any};
    authorization?: string;
  }

  /**
   * Parameters for postSettingsTypeAdoption
   */
  export interface PostSettingsTypeAdoptionParams {
    sheltersId?: string;
    body?: {type_adoption?: any};
    authorization?: string;
  }
}

export { DictonaryService }
