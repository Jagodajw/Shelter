import { prisma } from '../..';
import { ProvinceResponse } from '../../views/DictionaryView';

export class ProvinceService {
  constructor() {}

  public static async getList(): Promise<ProvinceResponse[]> {
    return await prisma.province.findMany();
  }
}
