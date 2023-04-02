import { prisma } from '..';
import { PrismaClientType } from '../models/DictionaryModel';
import { AreaService } from '../services/dictionary/AreaService';
import { BreedService } from '../services/dictionary/BreedService';
import { CityService } from '../services/dictionary/CityService';
import { ColorService } from '../services/dictionary/ColorService';
import { CommuneService } from '../services/dictionary/CommuneService';
import { SpeciesService } from '../services/dictionary/SpeciesService';
import { TypeAcceptanceService } from '../services/dictionary/TypeAcceptanceService';
import { TypeAdoptionService } from '../services/dictionary/TypeAdoptionService';
import {
  AnimalAdoptionRequest,
  RegisterAnimalAddRequest,
  RegisterPersonAddRequest,
  RegistrationAddRequest,
} from '../views/AnimalsView';

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
    if (!this.isPrimitiveTypeOf(data)) return data.ID;

    switch (key) {
      case 'species': {
        const newSpecies = await SpeciesService.add(
          { species: data, ...extraData },
          shelterId,
          this.prismaClient
        );
        return newSpecies.ID;
      }
      case 'breed': {
        const newBreed = await BreedService.add(
          { breed: data, ...extraData },
          shelterId,
          this.prismaClient
        );
        return newBreed.ID;
      }

      case 'commune': {
        const newCommune = await CommuneService.add(
          { commune: data, ...extraData },
          shelterId,
          this.prismaClient
        );
        return newCommune.ID;
      }

      case 'area': {
        const newArea = await AreaService.add(
          { area: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newArea.ID;
      }

      case 'color': {
        const newColor = await ColorService.add(
          { color: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newColor.ID;
      }

      case 'city': {
        const newCity = await CityService.add(
          { city: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newCity.ID;
      }

      case 'type_of_acceptance': {
        console.log('eo', { type_acceptance: data, ...extraData });
        const newTypeOfAcceptance = await TypeAcceptanceService.add(
          { type_acceptance: data, ...extraData },
          shelterId,
          this.prismaClient
        );

        return newTypeOfAcceptance.ID;
      }

      case 'type_adoption': {
        const newTypeOfAdoption = await TypeAdoptionService.add(
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

  private addDictonary<TInstance>(shelterId: string) {
    return async (dictonaryInstance: any, model: any) =>
      await dictonaryInstance.add(model, this.prismaClient);
  }
}
