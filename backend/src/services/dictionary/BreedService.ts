import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import {
  BreedListResponse,
  BreedRequest,
  BreedResponse,
} from '../../views/DictionaryView';

export class BreedService {
  constructor() {}

  public static async getList(
    sheltersId: string
  ): Promise<BreedListResponse[]> {
    return await prisma.breed.findMany({
      where: {
        shelters_id: sheltersId,
      },
      select: {
        ID: true,
        breed: true,
        shelters_id: true,
        species: true,
      },
    });
  }
  public static async getListBySpeciesId(
    shelterId: string,
    speciesId: number
  ): Promise<BreedResponse[]> {
    return await prisma.breed.findMany({
      where: { shelters_id: shelterId, species_id: speciesId },
    });
  }

  public static async delete(breedId: number) {
    return await prisma.breed.delete({
      where: {
        ID: breedId,
      },
    });
  }

  public static async update(breedId: number, breedModel: BreedRequest) {
    return await prisma.breed.update({
      where: {
        ID: breedId,
      },
      data: breedModel,
    });
  }

  public static async add(
    breedModel: BreedRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<BreedResponse> {
    return await prismaClient.breed.create({
      data: {
        breed: breedModel.breed,
        species_id: breedModel.species_id,
        shelters_id: shelters_id,
      },
    });
  }
}
