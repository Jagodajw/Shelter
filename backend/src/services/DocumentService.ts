import { prisma } from '..';
import { extractedDocumentList } from '../data/DocumentData';
import { DocumentFileResponse, DocumentModel } from '../models/DocumentModel';
import { DocumentResponse } from '../views/DocumentView';

export class DocumentService {
  constructor() {}

  public static async getList(shelterId: string): Promise<DocumentResponse[]> {
    return prisma.document.findMany({
      where: { shelters_id: shelterId },
      select: {
        ...extractedDocumentList,
      },
    });
  }

  public static async getListByAnimalId(
    animalId: string
  ): Promise<DocumentResponse[]> {
    return prisma.document.findMany({
      where: { animals_id: animalId },
      select: {
        ...extractedDocumentList,
      },
    });
  }

  public static async getFile(
    documentId: string
  ): Promise<DocumentFileResponse> {
    return prisma.document.findUnique({
      where: { ID: documentId },
      select: { file: true },
    });
  }

  public static async add(
    documentModel: DocumentModel
  ): Promise<DocumentResponse> {
    return prisma.document.create({
      data: documentModel,
      select: {
        ...extractedDocumentList,
      },
    });
  }

  public static async delete(documentId: string): Promise<void> {
    await prisma.document.delete({
      where: { ID: documentId },
    });
  }
}
