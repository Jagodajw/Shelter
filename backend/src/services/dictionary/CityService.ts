import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import { CityRequest, CityResponse } from '../../views/DictionaryView';

export class CityService {
  constructor() {}

  public static async getList(sheltersId: string): Promise<CityResponse[]> {
    return await prisma.city.findMany({
      where: {
        shelters_id: sheltersId,
      },
    });
  }

  public static async delete(cityId: number) {
    return await prisma.city.delete({
      where: {
        ID: cityId,
      },
    });
  }

  public static async update(cityId: number, updateCityModel: CityRequest) {
    return await prisma.city.update({
      where: {
        ID: cityId,
      },
      data: {
        city: updateCityModel.city,
        zip_code: updateCityModel.zip_code,
      },
    });
  }

  public static async add(
    cityModel: CityRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<CityResponse> {
    return await prismaClient.city.create({
      data: {
        ...cityModel,
        shelters_id,
      },
    });
  }
}
