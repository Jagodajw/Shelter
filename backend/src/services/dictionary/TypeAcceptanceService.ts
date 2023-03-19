import { TypeAcceptance } from '@prisma/client';
import { prisma } from '../..';
import { PrismaClientType } from '../../models/DictionaryModel';
import {
  TypeAcceptanceRequest,
  TypeAcceptanceResponse,
} from '../../views/DictionaryView';

export class TypeAcceptanceService {
  constructor() {}

  public static async getList(
    shelters_id: string
  ): Promise<TypeAcceptanceResponse[]> {
    return await prisma.typeAcceptance.findMany({ where: { shelters_id } });
  }

  public static async add(
    typeAcceptanceRequest: TypeAcceptanceRequest,
    shelters_id: string,
    prismaClient: PrismaClientType = prisma
  ): Promise<TypeAcceptanceResponse> {
    return await prismaClient.typeAcceptance.create({
      data: { ...typeAcceptanceRequest, shelters_id },
    });
  }

  public static async delete(
    acceptanceTypeId: number
  ): Promise<TypeAcceptanceResponse> {
    return await prisma.typeAcceptance.delete({
      where: { ID: acceptanceTypeId },
    });
  }

  public static async update(
    typeAcceptanceId: number,
    typeAcceptanceModel: TypeAcceptanceRequest
  ): Promise<TypeAcceptance> {
    return await prisma.typeAcceptance.update({
      where: { ID: typeAcceptanceId },
      data: typeAcceptanceModel,
    });
  }
}
