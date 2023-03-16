import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import { ColorRequest, ColorResponse } from '../../views/DictionaryView';

export class ColorService {
  constructor() {}

  public static async getList(sheltersId: string): Promise<ColorResponse[]> {
    return await prisma.color.findMany({
      where: {
        shelters_id: sheltersId,
      },
    });
  }

  public static async delete(colorId: number) {
    return await prisma.color.delete({
      where: {
        ID: colorId,
      },
    });
  }

  public static async update(colorId: number, updateColor: string) {
    return await prisma.color.update({
      where: {
        ID: colorId,
      },
      data: {
        color: updateColor,
      },
    });
  }

  public static async add(
    colorModel: ColorRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<ColorResponse> {
    return await prismaClient.color.create({
      data: {
        ...colorModel,
        shelters_id,
      },
    });
  }
}
