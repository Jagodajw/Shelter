import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import { SpeciesRequest, SpeciesResponse } from '../../views/DictionaryView';

export class SpeciesService {
  constructor() {}

  public static async getList(sheltersId: string): Promise<SpeciesResponse[]> {
    return await prisma.species.findMany({
      where: {
        shelters_id: sheltersId,
      },
    });
  }

  public static async delete(speciesId: number) {
    return await prisma.species.delete({
      where: {
        ID: speciesId,
      },
    });
  }

  public static async update(speciesId: number, model: SpeciesRequest) {
    return await prisma.species.update({
      where: {
        ID: speciesId,
      },
      data: model,
    });
  }

  public static async add(
    speciesModel: SpeciesRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<SpeciesResponse> {
    return await prismaClient.species.create({
      data: {
        ...speciesModel,
        shelters_id,
      },
    });
  }
}
