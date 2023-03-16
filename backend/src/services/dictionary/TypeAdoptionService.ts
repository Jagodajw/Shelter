import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import {
  TypeAdoptionRequest,
  TypeAdoptionResponse,
} from '../../views/DictionaryView';

export class TypeAdoptionService {
  constructor() {}

  public static async getList(
    sheltersId: string
  ): Promise<TypeAdoptionResponse[]> {
    return await prisma.typeAdoption.findMany({
      where: {
        shelters_id: sheltersId,
      },
    });
  }

  public static async delete(typeAdoptionId: number) {
    return await prisma.typeAdoption.delete({
      where: {
        ID: typeAdoptionId,
      },
    });
  }

  public static async update(
    typeAdoptionId: number,
    updateTypeAdoption: string
  ) {
    return await prisma.typeAdoption.update({
      where: {
        ID: typeAdoptionId,
      },
      data: {
        type_adoption: updateTypeAdoption,
      },
    });
  }

  public static async add(
    typeAdoptionModel: TypeAdoptionRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<TypeAdoptionResponse> {
    return await prismaClient.typeAdoption.create({
      data: {
        ...typeAdoptionModel,
        shelters_id,
      },
    });
  }
}
