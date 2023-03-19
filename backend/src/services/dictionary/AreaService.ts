import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import { AreaRequest, AreaResponse } from '../../views/DictionaryView';

export class AreaService {
  constructor() {}

  public static async getList(sheltersId: string): Promise<AreaResponse[]> {
    return await prisma.area.findMany({
      where: {
        shelters_id: sheltersId,
      },
    });
  }

  public static async delete(areaId: number) {
    return await prisma.area.delete({
      where: {
        ID: areaId,
      },
    });
  }

  public static async update(areaId: number, areaModel: AreaRequest) {
    return await prisma.area.update({
      where: {
        ID: areaId,
      },
      data: areaModel,
    });
  }

  public static async add(
    areaModel: AreaRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<AreaResponse> {
    return await prismaClient.area.create({
      data: {
        ...areaModel,
        shelters_id,
      },
    });
  }
}
