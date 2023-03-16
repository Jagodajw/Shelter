import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import { CommuneRequest, CommuneResponse } from '../../views/DictionaryView';

export class CommuneService {
  constructor() {}

  public static async getList(sheltersId: string): Promise<CommuneResponse[]> {
    return await prisma.commune.findMany({
      where: {
        shelters_id: sheltersId,
      },
    });
  }

  public static async delete(communeId: number) {
    return await prisma.commune.delete({
      where: {
        ID: communeId,
      },
    });
  }

  public static async update(communeId: number, updateCommune: string) {
    return await prisma.commune.update({
      where: {
        ID: communeId,
      },
      data: {
        commune: updateCommune,
      },
    });
  }

  public static async add(
    communeModel: CommuneRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<CommuneResponse> {
    return await prismaClient.commune.create({
      data: {
        ...communeModel,
        shelters_id,
      },
    });
  }
}
