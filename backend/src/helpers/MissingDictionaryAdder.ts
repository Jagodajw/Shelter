import {
  RegisterAnimalAddRequest,
  RegisterPersonAddRequest,
  RegistrationAddRequest,
} from '../models/AnimalsModel';
import {
  addArea,
  addBreed,
  addCity,
  addColor,
  addComune,
  addSpecies,
} from '../services/DictionaryService';

type RequestKeys =
  | keyof RegisterAnimalAddRequest
  | keyof RegisterPersonAddRequest
  | keyof RegistrationAddRequest;

export class MissingDictionaryAdder {
  constructor() {}
  public static async getDictonaryField<TData extends { ID: number }>(
    key: RequestKeys,
    data: TData | string,
    shelterId: string,
    extraData?: any
  ): Promise<number> {
    console.log(data, !this.isPrimitiveTypeOf(data));
    if (!this.isPrimitiveTypeOf(data)) return data.ID;

    switch (key) {
      case 'species': {
        const newSpecies = await addSpecies(
          { species: data, ...extraData },
          shelterId
        );
        return newSpecies.ID;
      }
      case 'breed': {
        const newBreed = await addBreed(
          { breed: data, ...extraData },
          shelterId
        );
        return newBreed.ID;
      }

      case 'commune': {
        const newCommune = await addComune(
          { commune: data, ...extraData },
          shelterId
        );
        return newCommune.ID;
      }

      case 'area': {
        const newArea = await addArea({ area: data, ...extraData }, shelterId);

        return newArea.ID;
      }

      case 'color': {
        const newColor = await addColor(
          { color: data, ...extraData },
          shelterId
        );

        return newColor.ID;
      }

      case 'city': {
        const newCity = await addCity({ city: data, ...extraData }, shelterId);

        return newCity.ID;
      }

      default:
        return 0;
    }
  }

  private static isPrimitiveTypeOf(dictionary: unknown): dictionary is string {
    return typeof dictionary === 'string';
  }
}
