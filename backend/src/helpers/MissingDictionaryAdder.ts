import { prisma } from '..';
import {
  AnimalAdoptionRequest,
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
  addTypeAcceptance,
  addTypeAdoption,
  PrismaClientType,
} from '../services/DictionaryService';

type RequestKeys =
  | keyof RegisterAnimalAddRequest
  | keyof RegisterPersonAddRequest
  | keyof RegistrationAddRequest
  | keyof AnimalAdoptionRequest;

export class MissingDictionaryAdder {
  constructor(private readonly prismaClient: PrismaClientType = prisma) {}
  public async getDictonaryField<TData extends { ID: number }>(
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
          shelterId,
          this.prismaClient
        );
        return newSpecies.ID;
      }
      case 'breed': {
        const newBreed = await addBreed(
          { breed: data, ...extraData },
          shelterId,
          this.prismaClient
        );
        return newBreed.ID;
      }

      case 'commune': {
        const newCommune = await addComune(
          { commune: data, ...extraData },
          shelterId,
          this.prismaClient
        );
        return newCommune.ID;
      }

      case 'area': {
        const newArea = await addArea(
          { area: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newArea.ID;
      }

      case 'color': {
        const newColor = await addColor(
          { color: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newColor.ID;
      }

      case 'city': {
        const newCity = await addCity(
          { city: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newCity.ID;
      }

      case 'type_of_acceptance': {
        const newTypeOfAcceptance = await addTypeAcceptance(
          { type_acceptance: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newTypeOfAcceptance.ID;
      }

      case 'type_adoption': {
        const newTypeOfAdoption = await addTypeAdoption(
          { type_adoption: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newTypeOfAdoption.ID;
      }

      default:
        return 0;
    }
  }

  private isPrimitiveTypeOf(dictionary: unknown): dictionary is string {
    return typeof dictionary === 'string';
  }
}
